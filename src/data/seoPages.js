/**
 * SEO Landing Pages Configuration
 * 
 * Rules:
 * - freePickup: false (default). Titles/meta/H1/CTA use "Free Pickup" ONLY when freePickup is true.
 *   Otherwise use "Doorstep Pickup Booking" or no pickup claim.
 * - pickupModel: "own" | "partner"
 * - pickupPincodes: [] (array of confirmed pincodes)
 * - pickupTAT: "TODO" (turnaround time e.g., "Within 2-4 Hours", "Same Day")
 * - pickupTerms: "TODO" (minimum weight, conditions; displayed visibly near CTA)
 * - A page with freePickup: true but empty pickupPincodes or pickupTAT must stay isReady: false.
 * - seoPages.js entries stay isReady: false until user fills rates/pincodes/timings.
 */

export const priorityCities = [
  {
    slug: "dhanbad",
    city: "Dhanbad",
    state: "Jharkhand",
    freePickup: false, // Default false until rates/pincodes/timings confirmed
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    areas: "Saraidhela, Bank More, Hirapur, Katras, Jharia, IIT ISM Campus",
  },
  {
    slug: "bokaro",
    city: "Bokaro",
    state: "Jharkhand",
    freePickup: false,
    pickupModel: "partner",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    areas: "Sector 4, Sector 9, Chas, City Centre",
  },
  {
    slug: "giridih",
    city: "Giridih",
    state: "Jharkhand",
    freePickup: false,
    pickupModel: "partner",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    areas: "Bada Chowk, Makatpur, Pachamba, Station Road",
  },
  {
    slug: "hazaribagh",
    city: "Hazaribagh",
    state: "Jharkhand",
    freePickup: false,
    pickupModel: "partner",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    areas: "Babu Gaon, Korrah, Matwari, Canary Hill Road",
  },
  {
    slug: "ranchi",
    city: "Ranchi",
    state: "Jharkhand",
    freePickup: false,
    pickupModel: "partner",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    areas: "Lalpur, Doranda, Kanke, Harmu, Hinoo, Morabadi",
  },
  {
    slug: "jamshedpur",
    city: "Jamshedpur",
    state: "Jharkhand",
    freePickup: false,
    pickupModel: "partner",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    areas: "Bistupur, Sakchi, Kadma, Telco, Sonari, NIT Campus",
  },
  {
    slug: "asansol",
    city: "Asansol",
    state: "West Bengal",
    freePickup: false,
    pickupModel: "partner",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    areas: "Burnpur, Ushagram, Sen Raleigh Road, Court Area",
  },
  {
    slug: "durgapur",
    city: "Durgapur",
    state: "West Bengal",
    freePickup: false,
    pickupModel: "partner",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    areas: "City Centre, Benachity, Bidhannagar, Steel Township, NIT Durgapur",
  },
];

export const routePages = [
  {
    slug: "courier-service-dhanbad-to-delhi",
    origin: "Dhanbad",
    destination: "Delhi",
    freePickup: false,
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    estimatedDays: "2-3 Days",
  },
  {
    slug: "courier-service-dhanbad-to-kolkata",
    origin: "Dhanbad",
    destination: "Kolkata",
    freePickup: false,
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    estimatedDays: "1-2 Days",
  },
  {
    slug: "courier-service-dhanbad-to-bangalore",
    origin: "Dhanbad",
    destination: "Bangalore",
    freePickup: false,
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    estimatedDays: "3-4 Days",
  },
  {
    slug: "courier-service-dhanbad-to-mumbai",
    origin: "Dhanbad",
    destination: "Mumbai",
    freePickup: false,
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    estimatedDays: "3-4 Days",
  },
  {
    slug: "courier-service-dhanbad-to-hyderabad",
    origin: "Dhanbad",
    destination: "Hyderabad",
    freePickup: false,
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    estimatedDays: "3-4 Days",
  },
  {
    slug: "courier-service-dhanbad-to-patna",
    origin: "Dhanbad",
    destination: "Patna",
    freePickup: false,
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
    estimatedDays: "1-2 Days",
  },
];

export const servicePages = [
  {
    slug: "packers-and-movers-dhanbad",
    title: "Packers and Movers in Dhanbad",
    city: "Dhanbad",
    freePickup: false,
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
  },
  {
    slug: "office-shifting-dhanbad",
    title: "Office Shifting Services in Dhanbad",
    city: "Dhanbad",
    freePickup: false,
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
  },
  {
    slug: "student-parcel-iit-ism-dhanbad",
    title: "Student Parcel & Luggage Shifting | IIT (ISM) Dhanbad",
    city: "Dhanbad",
    freePickup: false,
    pickupModel: "own",
    pickupPincodes: [],
    pickupTAT: "TODO",
    pickupTerms: "TODO",
    isReady: false,
    rates: null,
  },
];

/**
 * Validates if a page is ready for indexable publication.
 * A page with freePickup: true but empty pickupPincodes or pickupTAT: "TODO" stays false.
 */
export function isPageReady(page) {
  if (!page) return false;
  if (!page.isReady) return false;
  if (page.freePickup) {
    if (!page.pickupPincodes || page.pickupPincodes.length === 0) return false;
    if (!page.pickupTAT || page.pickupTAT === "TODO") return false;
  }
  if (!page.rates || page.pickupTerms === "TODO") return false;
  return true;
}

const seoPages = {
  priorityCities,
  routePages,
  servicePages,
  isPageReady,
};

export default seoPages;
