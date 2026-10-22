import DashboardLayoutClient from "./DashboardLayoutClient";

export const metadata = {
  title: "Dashboard | EngineersParcel",
  alternates: {
    canonical: "https://engineersparcel.in/dashboard",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardLayout({ children }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
