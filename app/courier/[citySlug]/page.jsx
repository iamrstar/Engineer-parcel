import { permanentRedirect } from "next/navigation";
import cities from "@/src/data/cities";

export async function generateStaticParams() {
  return cities.map((city) => ({
    citySlug: city.slug,
  }));
}

export default async function Page({ params }) {
  const { citySlug } = await params;
  permanentRedirect(`/best-courier-service-in-${citySlug}`);
}