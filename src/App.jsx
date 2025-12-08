import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"

import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import ContactPage from "./pages/ContactPage"
import BookingPage from "./pages/BookingPage"
import PincodeCheckerPage from "./pages/PincodeCheckerPage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"
import TermsPage from "./pages/TermsPage"

// Newly added pages
import VisionMission from "./pages/VisionMission"
import OurPartners from "./app/our-partner/page.jsx";
import Gallery from "./app/Activities/page.jsx";


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

        {/* New Pages */}
<Route path="/vision-mission" element={<VisionMission />} />

<Route path="/our-partners" element={<OurPartners />} />
        <Route path="/activities" element={<Gallery />} />
      </Routes>
    </Layout>
    
  )
}

export default App
