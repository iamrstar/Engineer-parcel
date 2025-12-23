"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryItems = [
  // Team Events
  {
    id: 1,
    title: "Annual Team Building Retreat",
    desc: "Our team bonding at the annual retreat, strengthening connections and celebrating achievements together",
    category: "team-events",
   image: "activities/express-delivery.jpeg"
  },
  {
    id: 2,
    title: "Training Workshop Session",
    desc: "Professional development workshop enhancing our team's skills and capabilities",
    category: "team-events",
    image: "activities/mla-meet.jpeg"
  },
  {
    id: 3,
    title: "New Year Celebration 2025",
    desc: "We provide blankets to underprivileged people. ",
    category: "team-events",
    image: "activities/blanket-donate.jpeg"
  },
  {
    id: 4,
    title: "Quarterly Team Meeting",
    desc: "Strategic planning session with all departments coming together",
    category: "team-events",
    image: "activities/team-meeting-delhi.jpeg"
  },
  
  // Happy Moments
  {
    id: 5,
    title: "Employee of the Month Award",
    desc: "Celebrating excellence and dedication of our outstanding team members",
    category: "happy-moments",
   image: "activities/at-news-paper.jpeg"
  },
  {
    id: 6,
    title: "Birthday Celebration",
    desc: "Making every team member feel special on their birthday",
    category: "happy-moments",
    image: "activities/team-members.jpeg"
  },
  {
    id: 7,
    title: "Festival Celebrations",
    desc: "Embracing cultural diversity through festival celebrations at workplace",
    category: "happy-moments",
   image: "activities/at-news-paper.jpeg"
  },
  {
    id: 8,
    title: "Achievement Milestone",
    desc: "Celebrating 1 million successful deliveries with our incredible team",
    category: "happy-moments",
   image: "activities/happy-customer.jpeg"
  },
  {
    id: 9,
    title: "Team Lunch Gathering",
    desc: "Bonding over good food and great conversations",
    category: "happy-moments",
   image: "/express-delivery.jpeg"
  },
  
  // Customer Deliveries
  {
    id: 10,
    title: "Express Parcel Delivery",
    desc: "Delivering smiles with every package - our commitment to excellence",
    category: "customer-delivery",
   image: "/express-delivery.jpeg"
  },
  {
    id: 11,
    title: "Safe Delivery in Remote Area",
    desc: "Reaching every corner of India, no matter how remote",
    category: "customer-delivery",
   image: "/express-delivery.jpeg"
  },
  {
    id: 12,
    title: "Happy Customer Moment",
    desc: "The joy on customer's face makes every delivery worthwhile",
    category: "customer-delivery",
   image: "/express-delivery.jpeg"
  },
  {
    id: 13,
    title: "Bulk Order Success",
    desc: "Successfully handled and delivered large corporate shipment",
    category: "customer-delivery",
   image: "/express-delivery.jpeg"
  },
  {
    id: 14,
    title: "Same Day Delivery",
    desc: "Lightning-fast service ensuring urgent packages reach on time",
    category: "customer-delivery",
    image: "/express-delivery.jpeg"
  },
  {
    id: 15,
    title: "Doorstep Delivery Service",
    desc: "Personal touch in every delivery, right to your doorstep",
    category: "customer-delivery",
   image: "/express-delivery.jpeg"
  },
  {
    id: 16,
    title: "International Shipment",
    desc: "Connecting borders and delivering dreams globally",
    category: "customer-delivery",
  image: "/express-delivery.jpeg"
  },
  {
    id: 17,
    title: "Fragile Item Care",
    desc: "Extra care and attention for your precious items",
    category: "customer-delivery",
   image: "/express-delivery.jpeg"
  }
];

const categories = [
  { id: "all", label: "All" },
  { id: "team-events", label: "Team Events" },
  { id: "happy-moments", label: "Happy Moments" },
  { id: "customer-delivery", label: "Customer Delivery" }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (index) => {
    const actualIndex = galleryItems.findIndex(item => item.id === filteredItems[index].id);
    setCurrentImage(actualIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Camera className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Moments
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            A visual journey through our operations, team, and commitment to excellence
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={
                  selectedCategory === category.id
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "border-orange-600 text-orange-600 hover:bg-orange-50"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No images found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Lightbox
          item={galleryItems[currentImage]}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
          currentIndex={currentImage}
          totalItems={galleryItems.length}
        />
      )}
    </div>
  );
}

function GalleryCard({ item, onClick }) {
  const categoryLabel = categories.find(cat => cat.id === item.category)?.label || item.category;
  
  return (
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container with aspect ratio */}
      <div className="relative w-full pb-[75%] bg-gray-200">
        <div className="absolute inset-0">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
              <Camera className="h-20 w-20 text-orange-400" />
            </div>
          )}
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white text-orange-600 rounded-full p-3">
              <Camera className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
        <div className="mt-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-orange-600 bg-orange-50 rounded-full">
            {categoryLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ item, onClose, onPrevious, onNext, currentIndex, totalItems }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X className="h-8 w-8" />
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="absolute left-4 text-white hover:text-orange-400 transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-12 w-12" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 text-white hover:text-orange-400 transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight className="h-12 w-12" />
      </button>

      {/* Image and Content */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center">
          {/* Image Placeholder */}
          <div className="relative w-full max-w-4xl bg-gray-800 rounded-lg overflow-hidden mb-6">
            <div className="relative w-full pb-[66.67%]">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-900 to-orange-700">
                  <Camera className="h-32 w-32 text-orange-300" />
                </div>
              )}
            </div>
          </div>

          {/* Image Info */}
          <div className="text-center text-white max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-300 mb-4">{item.desc}</p>
            <p className="text-sm text-gray-400">
              {currentIndex + 1} / {totalItems}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}