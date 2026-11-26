import HomeClient from "./HomeClient";

export const metadata = {
  title: "EngineersParcel | India's Fastest & Easy Logistics Booking Platform",
  description:
    "India's fastest and easy tech-enabled logistics platform powered by Enzee AI. Seamless doorstep parcel booking, OneBox flat rates (₹799 up to 30kg), student campus parcel delivery, and AI-assisted logistics for customers and field teams.",
  alternates: {
    canonical: "https://engineersparcel.in",
  },
};

export default function Page() {
  return <HomeClient />;
}
