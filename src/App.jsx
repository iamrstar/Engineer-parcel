import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Import pages from app folder
import HomePage from "../app/page.jsx";
import AboutPage from "../app/about/page.jsx";
import ServicesPage from "../app/services/page.jsx";
import ContactPage from "../app/contact/page.jsx";
import BookingPage from "../app/booking/page.jsx";
import PincodeCheckerPage from "../app/pincode-checker/page.jsx";
import PrivacyPolicyPage from "../app/privacy-policy/page.jsx";
import TermsPage from "../app/terms/page.jsx";
import VisionMission from "../app/vision-mission/page.jsx";
import OurPartners from "../app/our-partners/page.jsx";
import Gallery from "../app/Activities/page.jsx";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/pincode-checker" element={<PincodeCheckerPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/vision-mission" element={<VisionMission />} />
        <Route path="/our-partners" element={<OurPartners />} />
        <Route path="/activities" element={<Gallery />} />
      </Routes>
    </Layout>
  );
}

export default App;
