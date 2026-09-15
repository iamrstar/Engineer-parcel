export const metadata = {
  title: "Track Parcel & Courier Status Online",
  description:
    "Track your EngineersParcel shipment live. Enter your Tracking ID / AWB number to check real-time courier location, shipment transit history, and estimated delivery date.",
  alternates: {
    canonical: "/track-order",
  },
  openGraph: {
    title: "Live Parcel Tracking | EngineersParcel",
    description:
      "Instant real-time tracking for your courier shipments. Know exactly where your package is at every step.",
    url: "/track-order",
  },
};

export default function TrackOrderLayout({ children }) {
  return children;
}
