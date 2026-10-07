"use client";

import BestCourierClient from "@/app/best-courier-service-in/[citySlug]/BestCourierClient";

export default function CityClient({ city }) {
  return <BestCourierClient city={city} />;
}