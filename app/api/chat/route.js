import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// System prompt with full knowledge base of EngineersParcel
const SYSTEM_PROMPT = `You are "ENZEE AI", the official AI Assistant of EngineersParcel (Engineers Parcel Pvt. Ltd.).
Your goal is to assist customers politely, quickly, and accurately with shipping queries, parcel tracking, rates, campus logistics, and booking guidance.

COMPANY KNOWLEDGE:
- Company Name: EngineersParcel (Tagline: "Making Life Easy")
- Headquarters: Police Line Rd, IIT (ISM), Sardar Patel Nagar, Dhanbad, Jharkhand - 826004
- Founded by engineers from IIT (ISM) Dhanbad (Raj Chatterjee - Tech Head, Subham Sawarnkar - Strategy Head).
- Coverage: Pan-India across 19,000+ pincodes with doorstep pickup and live tracking.
- Contact: Phone/WhatsApp: +91 95258 01506 | Email: info.engineersparcel@gmail.com
- Main Website: https://engineersparcel.in

SERVICES & EXACT PRICING:
1. OneBox (For 10+ kg heavy shipments - pack anything that fits, zero volumetric weight confusion!):
   - Alpha Box: ₹799 flat rate (Dimensions: 42 × 42 × 27 cm, Capacity: Up to 30 kg). Ideal for clothes, books, essentials.
   - Nova Box: ₹1,599 flat rate (Dimensions: 60 × 35 × 40 cm, Capacity: Up to 60 kg). Ideal for heavy luggage, bulky belongings.
   - Doorstep pickup included. Free sturdy box provided!

2. Campus Parcel (Dedicated Student Logistics across India):
   - Direct hostel room pickup! Students don't need to carry luggage down stairs or go to courier offices.
   - SPECIAL RATES for IIT ISM Dhanbad:
     * Alpha Box: ₹599 (up to 30kg)
     * Nova Box: ₹1,149 (up to 75kg)
   - Other partner campuses: SNMMCH Dhanbad (Alpha ₹799, Nova ₹1599), BIT Mesra, NIT Jamshedpur, NIT Durgapur, etc.

3. Standard Courier:
   - For envelopes, small packets, and documents across 19,000+ pincodes in India.

4. City Parcel:
   - Same-day hyper-local express delivery within Dhanbad.

RULES & BEHAVIOR:
- Respond in the language the user speaks (English, Hindi, or Hinglish).
- STRICT CONCISENESS MANDATE: Keep all responses under 60-80 words (strictly under 100 tokens). Be direct, punchy, and helpful. Avoid long conversational fillers or repeated intro phrases.
- Be polite and helpful. Use clean bullet points.
- When a user provides a Tracking ID or Pincode, ALWAYS call the appropriate tool to fetch live accurate data.
- If a customer needs special commercial shipping, custom crates, or wants to speak to a person, suggest contacting human support on WhatsApp (+91 95258 01506).
- Never invent tracking statuses or pincode availability without checking tools.`;

// Define Tool Definitions for Groq
const TOOLS = [
  {
    type: "function",
    function: {
      name: "track_parcel",
      description: "Lookup live tracking status and journey of a parcel by booking ID or customer phone number",
      parameters: {
        type: "object",
        properties: {
          trackingId: {
            type: "string",
            description: "The booking or tracking ID, e.g., EP280926001 or any alphanumeric ID provided by the user.",
          },
          phone: {
            type: "string",
            description: "Customer 10-digit Indian phone number if they provided phone instead of booking ID.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_pincode",
      description: "Check if a 6-digit Indian pincode is serviceable and get estimated delivery time",
      parameters: {
        type: "object",
        properties: {
          pincode: {
            type: "string",
            description: "6-digit Indian postal pincode, e.g., 826004, 560034, 110001",
          },
        },
        required: ["pincode"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_quote_estimate",
      description: "Get instant price estimate for OneBox, campus luggage, or regular courier",
      parameters: {
        type: "object",
        properties: {
          serviceType: {
            type: "string",
            enum: ["onebox", "campus", "courier", "city"],
            description: "Type of delivery service",
          },
          college: {
            type: "string",
            description: "Name of college if campus parcel (e.g. IIT ISM Dhanbad)",
          },
          weightKg: {
            type: "number",
            description: "Estimated weight in kg",
          },
        },
        required: ["serviceType"],
      },
    },
  },
];

// Tool Execution Handlers
async function executeTool(name, args) {
  try {
    if (name === "track_parcel") {
      const id = args.trackingId || args.phone;
      if (!id) return { error: "Please provide a valid Booking ID or phone number." };
      
      const res = await fetch(`${API_BASE_URL}/api/tracking/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        return { 
          found: false, 
          message: `No active shipment found for "${id}". Please verify your booking ID or reach support at +91 95258 01506.` 
        };
      }
      const data = await res.json();
      return { found: true, details: data };
    }

    if (name === "check_pincode") {
      const { pincode } = args;
      if (!/^\d{6}$/.test(pincode)) {
        return { serviceable: false, message: "Invalid 6-digit pincode format." };
      }
      const res = await fetch(`${API_BASE_URL}/api/pincode/check/${pincode}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        return { 
          serviceable: true, 
          pincode, 
          note: "Standard delivery coverage via our Pan-India network (19,000+ pincodes)." 
        };
      }
      const data = await res.json();
      return data;
    }

    if (name === "get_quote_estimate") {
      const { serviceType, college, weightKg } = args;
      const isISM = college && college.toLowerCase().includes("ism");
      
      if (serviceType === "campus") {
        return {
          service: "Campus Parcel",
          college: isISM ? "IIT ISM Dhanbad" : (college || "College Campus"),
          alphaBoxPrice: isISM ? 599 : 799,
          novaBoxPrice: isISM ? 1149 : 1599,
          alphaCapacity: "Up to 30 kg",
          novaCapacity: "Up to 75 kg",
          hostelRoomPickup: "Included at zero extra cost",
        };
      }

      if (serviceType === "onebox" || (weightKg && weightKg >= 10)) {
        return {
          service: "OneBox Flat Rate",
          alphaBox: { name: "Alpha Box", price: 799, capacity: "Up to 30 kg", dimensions: "42 × 42 × 27 cm" },
          novaBox: { name: "Nova Box", price: 1599, capacity: "Up to 60 kg", dimensions: "60 × 35 × 40 cm" },
          guarantee: "Zero volumetric weight calculation. If it fits, it ships at the flat rate!",
        };
      }

      return {
        service: "General Courier",
        baseRate: "Starting at ₹150 for document/small parcel",
        doorstepPickup: "Available across 19,000+ pincodes",
      };
    }
  } catch (err) {
    console.error("Tool execution error:", err);
    return { error: "Service temporarily unavailable. Please try again or contact +91 95258 01506." };
  }

  return { error: "Unknown tool call" };
}

// Fallback rule-based NLP response when no API key is provided
function generateFallbackResponse(userMessage) {
  const text = (userMessage || "").toLowerCase();

  if (text.includes("track") || text.includes("status") || text.includes("where is") || text.includes("ep2")) {
    const match = text.match(/ep\d+/i);
    if (match) {
      return `📦 I found tracking request for **${match[0].toUpperCase()}**!\n\nYou can view real-time live tracking directly on our [Order Tracking Page](https://engineersparcel.in/track-order) or call our tracking desk at **+91 95258 01506**.`;
    }
    return `📦 To track your parcel, please provide your **Booking ID** (starts with *EP...*) or the **phone number** used during booking! You can also check our [Live Tracking Page](https://engineersparcel.in/track-order).`;
  }

  if (text.includes("price") || text.includes("rate") || text.includes("cost") || text.includes("how much") || text.includes("charge")) {
    return `💰 **EngineersParcel Pricing Highlights:**\n\n` +
      `📦 **OneBox (Pan-India Doorstep Delivery):**\n` +
      `• **Alpha Box:** **₹799** (Up to 30 kg — 42 × 42 × 27 cm)\n` +
      `• **Nova Box:** **₹1,599** (Up to 60 kg — 60 × 35 × 40 cm)\n` +
      `*No weighing tape or volumetric math needed! Pack whatever fits up to the weight limit.*\n\n` +
      `🎓 **IIT ISM Dhanbad Campus Special:**\n` +
      `• **Alpha Box:** **₹599** (Up to 30 kg)\n` +
      `• **Nova Box:** **₹1,149** (Up to 75 kg)\n` +
      `*Includes direct hostel room pickup!*\n\n` +
      `Want an exact quote? Try our [Price Estimator](https://engineersparcel.in/price-estimator)!`;
  }

  if (text.includes("pincode") || text.includes("deliver") || text.includes("area") || text.includes("service")) {
    const pinMatch = text.match(/\b\d{6}\b/);
    if (pinMatch) {
      return `📍 **Pincode ${pinMatch[0]}** is covered under our Pan-India network (19,000+ pincodes)! We provide free doorstep pickup and safe transit. Would you like to book a parcel or calculate pricing?`;
    }
    return `📍 We deliver across **19,000+ pincodes Pan-India**! Share your 6-digit pincode or use our [Pincode Checker](https://engineersparcel.in/pincode-checker) to verify delivery speed.`;
  }

  if (text.includes("campus") || text.includes("hostel") || text.includes("ism") || text.includes("student") || text.includes("college")) {
    return `🎓 **Campus Parcel Service (India's #1 Campus Logistics):**\n\n` +
      `• **Hostel Room Pickup:** We pick up right from your room — no dragging heavy luggage down stairs!\n` +
      `• **IIT ISM Special Rates:** Alpha Box @ **₹599** (30kg) | Nova Box @ **₹1,149** (75kg)\n` +
      `• Free sturdy packaging boxes provided upfront.\n\n` +
      `Ready to book? Visit [Campus Parcel Booking](https://engineersparcel.in/campus-parcel) or tap to chat with us on WhatsApp!`;
  }

  if (text.includes("contact") || text.includes("human") || text.includes("support") || text.includes("phone") || text.includes("call") || text.includes("whatsapp")) {
    return `📞 **Reach EngineersParcel Support:**\n\n` +
      `• **Phone / WhatsApp:** [+91 95258 01506](tel:+919525801506)\n` +
      `• **Email:** [info.engineersparcel@gmail.com](mailto:info.engineersparcel@gmail.com)\n` +
      `• **HQ:** Police Line Rd, IIT (ISM), Dhanbad, Jharkhand\n\n` +
      `Our team is available Monday to Saturday, 9:00 AM – 8:00 PM!`;
  }

  return `👋 Hi there! I am **ENZEE AI**, your EngineersParcel AI Assistant.\n\nI can help you with:\n` +
    `• 📦 **Tracking your parcel** (just give your booking ID)\n` +
    `• 💰 **Checking shipping rates** (OneBox ₹799 / Campus rates)\n` +
    `• 📍 **Pincode serviceability** (19,000+ pincodes)\n` +
    `• 🎓 **Hostel & campus luggage shifting**\n\nWhat can I help you ship today?`;
}

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    // Graceful fallback if Groq API key is not configured yet
    if (!groqApiKey) {
      const lastUserMsg = messages.filter((m) => m.role === "user").pop()?.content || "";
      const fallbackReply = generateFallbackResponse(lastUserMsg);
      return NextResponse.json({ reply: fallbackReply });
    }

    const groq = new Groq({ apiKey: groqApiKey });

    // Format conversation history for Groq
    const conversation = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-8).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content || ""),
      })),
    ];

    // First completion call with tool access
    const response = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: conversation,
      tools: TOOLS,
      tool_choice: "auto",
      temperature: 0.3,
      max_completion_tokens: 120,
    });

    const responseMessage = response.choices[0]?.message;

    // Check if the model requested tool execution
    if (responseMessage?.tool_calls && responseMessage.tool_calls.length > 0) {
      const toolCall = responseMessage.tool_calls[0];
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments || "{}");

      const toolResult = await executeTool(functionName, functionArgs);

      // Send tool result back to Groq for final natural language synthesis
      const secondResponse = await groq.chat.completions.create({
        model: "qwen/qwen3.8-27b",
        messages: [
          ...conversation,
          responseMessage,
          {
            role: "tool",
            tool_call_id: toolCall.id,
            name: functionName,
            content: JSON.stringify(toolResult),
          },
        ],
        temperature: 0.3,
        max_completion_tokens: 120,
      });

      const finalReply = secondResponse.choices[0]?.message?.content || "Here is the information you requested.";
      return NextResponse.json({ reply: finalReply });
    }

    const reply = responseMessage?.content || "How else can I assist your shipping today?";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    // Even if Groq API throws an error (e.g., rate limit, network), fall back gracefully
    const fallbackReply = "I'm having a brief connection delay with my AI brain. You can reach our friendly team directly on WhatsApp or Call at **+91 95258 01506** for instant assistance!";
    return NextResponse.json({ reply: fallbackReply });
  }
}
