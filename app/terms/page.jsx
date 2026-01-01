export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            Legal Agreement
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            The terms that govern your use of our services
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last Updated: April 19, 2025
            </div>

            <div className="space-y-10">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">1</span>
                  Acceptance of Terms
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13">
                  By accessing or using the services provided by EngineersParcel ("we," "our," or "us"), you agree to be
                  bound by these Terms and Conditions. If you do not agree to these Terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">2</span>
                  Services Description
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13">
                  EngineersParcel provides courier, parcel delivery, and shifting services as described on our website and
                  mobile application. We reserve the right to modify, suspend, or discontinue any aspect of our services at
                  any time.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">3</span>
                  User Accounts
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13">
                  To access certain features of our services, you may need to create an account. You are responsible for
                  maintaining the confidentiality of your account information and for all activities that occur under your
                  account. You agree to provide accurate and complete information when creating your account and to update
                  your information as necessary.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">4</span>
                  Booking and Payment
                </h2>
                <div className="pl-13 space-y-6">
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Booking Process</h3>
                    <p className="text-gray-600 leading-relaxed">
                      When you book a service with us, you agree to provide accurate and complete information about the pickup
                      and delivery locations, parcel details, and any special handling requirements. We reserve the right to
                      refuse any booking at our discretion.
                    </p>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Payment Terms</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Payment for our services must be made in accordance with the rates and methods specified on our website or
                      mobile application. All prices are in Indian Rupees (INR) unless otherwise stated. We reserve the right to
                      change our prices at any time.
                    </p>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Cancellation and Refunds</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Cancellation policies and refund eligibility vary depending on the service booked. Please refer to our
                      Cancellation Policy for specific details. We reserve the right to charge cancellation fees as specified in
                      our Cancellation Policy.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">5</span>
                  Parcel Restrictions
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13 mb-4">
                  You agree not to send prohibited items through our services, including but not limited to:
                </p>
                <div className="pl-13 grid md:grid-cols-2 gap-3">
                  {[
                    { icon: "⚠️", text: "Illegal substances or items" },
                    { icon: "☢️", text: "Hazardous materials" },
                    { icon: "🍎", text: "Perishable goods (unless specifically arranged)" },
                    { icon: "💎", text: "Valuable items exceeding our insurance coverage limits" },
                    { icon: "🐕", text: "Live animals" },
                    { icon: "🔫", text: "Firearms, weapons, or explosives" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 bg-red-50 p-4 rounded-xl border border-red-100">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-gray-700 text-sm font-medium flex-1">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed pl-13 mt-4">
                  We reserve the right to inspect parcels to ensure compliance with these restrictions. Any violation may
                  result in the termination of services and potential legal action.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">6</span>
                  Delivery and Liability
                </h2>
                <div className="pl-13 space-y-6">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Delivery Timeframes</h3>
                    <p className="text-gray-600 leading-relaxed">
                      While we strive to meet all delivery timeframes, we do not guarantee specific delivery times unless
                      expressly stated. Delivery times are estimates and may be affected by factors beyond our control, such as
                      weather conditions, traffic, or customs delays.
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Liability Limitations</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our liability for loss, damage, or delay of parcels is limited to the amount specified in our insurance
                      coverage. We are not liable for any indirect, consequential, or special damages arising from the use of
                      our services.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">7</span>
                  User Conduct
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13 mb-4">
                  You agree to use our services in compliance with all applicable laws and regulations. You will not use our
                  services to:
                </p>
                <div className="pl-13 space-y-2">
                  {[
                    "Violate any laws or regulations",
                    "Infringe on the rights of others",
                    "Harass, threaten, or harm others",
                    "Engage in fraudulent activities",
                    "Interfere with the operation of our services"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">8</span>
                  Intellectual Property
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13">
                  All content on our website and mobile application, including text, graphics, logos, and software, is the
                  property of EngineersParcel or its licensors and is protected by intellectual property laws. You may not
                  use, reproduce, or distribute our content without our express permission.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">9</span>
                  Termination
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13">
                  We reserve the right to terminate or suspend your access to our services at any time, with or without
                  cause, and without prior notice or liability.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">10</span>
                  Governing Law
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13">
                  These Terms and Conditions are governed by the laws of India. Any disputes arising from these Terms will
                  be subject to the exclusive jurisdiction of the courts in Dhanbad, Jharkhand, India.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-xl text-lg font-bold">11</span>
                  Changes to Terms
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13">
                  We may update these Terms and Conditions from time to time. We will notify you of any changes by posting
                  the new Terms on this page and updating the "Last Updated" date. Your continued use of our services after
                  any changes indicates your acceptance of the new Terms.
                </p>
              </section>

              <section className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-orange-600 text-white rounded-xl text-lg font-bold">12</span>
                  Contact Us
                </h2>
                <p className="text-gray-600 leading-relaxed pl-13 mb-6">
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <div className="pl-13 space-y-4">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Email</div>
                      <div className="text-gray-900 font-semibold">engineersparcel@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Phone</div>
                      <div className="text-gray-900 font-semibold">+91-9525801506</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Address</div>
                      <div className="text-gray-900 font-semibold">4th Floor, I2H Building, IIT (ISM), Dhanbad</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
