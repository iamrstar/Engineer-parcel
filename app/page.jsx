import HomeClient from "./HomeClient";

export const metadata = {
  title: "EngineersParcel | Best Pan-India Courier Service & Doorstep Parcel Delivery",
  description:
    "Send courier & parcel anywhere in India across 19,000+ pincodes. EngineersParcel provides doorstep pickup, transparent prices, OneBox heavy luggage (₹799 up to 30kg), student campus parcel delivery, and live tracking.",
  alternates: {
    canonical: "https://engineersparcel.in",
  },
};

export default function Page() {
  return <HomeClient />;
}
