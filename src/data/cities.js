export const cities = [
  // ─── Jharkhand ───
  { slug: "dhanbad", city: "Dhanbad", state: "Jharkhand", areas: "Saraidhela, Bank More, Hirapur, Katras, Jharia, IIT ISM Campus" },
  { slug: "ranchi", city: "Ranchi", state: "Jharkhand", areas: "Lalpur, Doranda, Kanke, Harmu, Hinoo, Morabadi" },
  { slug: "bokaro", city: "Bokaro", state: "Jharkhand", areas: "Sector 4, Sector 9, Chas, City Centre" },
  { slug: "jamshedpur", city: "Jamshedpur", state: "Jharkhand", areas: "Bistupur, Sakchi, Kadma, Telco, Sonari, NIT Campus" },
  { slug: "deoghar", city: "Deoghar", state: "Jharkhand", areas: "Castairs Town, Jasidih, Williams Town, VIP Chowk" },
  { slug: "hazaribagh", city: "Hazaribagh", state: "Jharkhand", areas: "Babu Gaon, Korrah, Matwari, Canary Hill Road" },
  { slug: "giridih", city: "Giridih", state: "Jharkhand", areas: "Bada Chowk, Makatpur, Pachamba, Station Road" },

  // ─── Bihar & West Bengal ───
  { slug: "patna", city: "Patna", state: "Bihar", areas: "Kankarbagh, Boring Road, Bailey Road, Rajendra Nagar, Danapur, IIT Patna" },
  { slug: "gaya", city: "Gaya", state: "Bihar", areas: "Civil Lines, AP Colony, Bodh Gaya, Rampur" },
  { slug: "muzaffarpur", city: "Muzaffarpur", state: "Bihar", areas: "Mithanpura, Ahiyapur, Brahmpura, Kazi Mohammadpur" },
  { slug: "bhagalpur", city: "Bhagalpur", state: "Bihar", areas: "Tilkamanjhi, Adampur, Zero Mile, Barari" },
  { slug: "kolkata", city: "Kolkata", state: "West Bengal", areas: "Salt Lake, New Town, Park Street, Howrah, Gariahat, Jadavpur" },
  { slug: "asansol", city: "Asansol", state: "West Bengal", areas: "Burnpur, Ushagram, Sen Raleigh Road, Court Area" },
  { slug: "durgapur", city: "Durgapur", state: "West Bengal", areas: "City Centre, Benachity, Bidhannagar, Steel Township, NIT Durgapur" },
  { slug: "siliguri", city: "Siliguri", state: "West Bengal", areas: "Sevoke Road, Matigara, Pradhan Nagar, Hakim Para" },
  { slug: "kharagpur", city: "Kharagpur", state: "West Bengal", areas: "IIT Kharagpur Campus, Prembazar, Inda, Malancha" },

  // ─── Delhi NCR & North India ───
  { slug: "delhi", city: "Delhi", state: "Delhi", areas: "Connaught Place, South Extension, Rohini, Dwarka, DU North Campus, South Campus" },
  { slug: "noida", city: "Noida", state: "Uttar Pradesh", areas: "Sector 18, Sector 62, Greater Noida, Knowledge Park" },
  { slug: "gurugram", city: "Gurugram", state: "Haryana", areas: "Cyber City, DLF Phase 1-5, Golf Course Road, Sohna Road" },
  { slug: "chandigarh", city: "Chandigarh", state: "Punjab", areas: "Sector 17, Sector 35, Mohali, Panchkula, Panjab University" },
  { slug: "dehradun", city: "Dehradun", state: "Uttarakhand", areas: "Rajpur Road, Clock Tower, Clement Town, Sahastradhara Road" },
  { slug: "roorkee", city: "Roorkee", state: "Uttarakhand", areas: "IIT Roorkee Campus, Civil Lines, Solani Park, Rampur" },

  // ─── Uttar Pradesh ───
  { slug: "lucknow", city: "Lucknow", state: "Uttar Pradesh", areas: "Gomti Nagar, Hazratganj, Aliganj, Indira Nagar, IIM Road" },
  { slug: "kanpur", city: "Kanpur", state: "Uttar Pradesh", areas: "Kakadeo, Civil Lines, Swaroop Nagar, IIT Kanpur Campus, Kalyanpur" },
  { slug: "varanasi", city: "Varanasi", state: "Uttar Pradesh", areas: "Lanka, Sigra, Cantt, BHU Campus, Godowlia" },
  { slug: "prayagraj", city: "Prayagraj", state: "Uttar Pradesh", areas: "Civil Lines, Katra, Georgetown, MNNIT Allahabad Campus" },
  { slug: "agra", city: "Agra", state: "Uttar Pradesh", areas: "Sanjay Place, Tajganj, Dayalbagh, Kamla Nagar" },

  // ─── Rajasthan ───
  { slug: "jaipur", city: "Jaipur", state: "Rajasthan", areas: "Malviya Nagar, Vaishali Nagar, Mansarovar, C-Scheme, Tonk Road" },
  { slug: "kota", city: "Kota", state: "Rajasthan", areas: "Vigyan Nagar, Talwandi, Mahaveer Nagar, Rajeev Gandhi Nagar, Kunhari" },
  { slug: "jodhpur", city: "Jodhpur", state: "Rajasthan", areas: "Ratanada, Sardarpura, Shastri Nagar, IIT Jodhpur" },

  // ─── Maharashtra & Gujarat ───
  { slug: "mumbai", city: "Mumbai", state: "Maharashtra", areas: "Andheri, Bandra, Powai, IIT Bombay, Thane, Navi Mumbai" },
  { slug: "pune", city: "Pune", state: "Maharashtra", areas: "Hinjawadi, Kothrud, Viman Nagar, Baner, Wakad, FC Road" },
  { slug: "nagpur", city: "Nagpur", state: "Maharashtra", areas: "Dharampeth, Sitabuldi, Sadar, VNIT Campus, Wardha Road" },
  { slug: "ahmedabad", city: "Ahmedabad", state: "Gujarat", areas: "Navrangpura, Vastrapur, Satellite, Bodakdev, SG Highway" },
  { slug: "surat", city: "Surat", state: "Gujarat", areas: "Athwa, Adajan, Vesu, Piplod, Varachha" },
  { slug: "vadodara", city: "Vadodara", state: "Gujarat", areas: "Alkapuri, Fatehgunj, Akota, Gotri, Sayajigunj" },

  // ─── Madhya Pradesh ───
  { slug: "indore", city: "Indore", state: "Madhya Pradesh", areas: "Vijay Nagar, Palasia, Bhawar Kuan, Rajwada, IIT Indore Campus" },
  { slug: "bhopal", city: "Bhopal", state: "Madhya Pradesh", areas: "MP Nagar, Arera Colony, Kolar Road, MANIT Campus, TT Nagar" },

  // ─── Odisha & Northeast ───
  { slug: "bhubaneswar", city: "Bhubaneswar", state: "Odisha", areas: "Saheed Nagar, Patia, KIIT Campus, Nayapalli, Jaydev Vihar" },
  { slug: "rourkela", city: "Rourkela", state: "Odisha", areas: "Sector 1-20, Civil Township, Koel Nagar, NIT Rourkela" },
  { slug: "guwahati", city: "Guwahati", state: "Assam", areas: "GS Road, Paltan Bazaar, Dispur, IIT Guwahati Campus, Jalukbari" },

  // ─── South India Hubs ───
  { slug: "bengaluru", city: "Bengaluru", state: "Karnataka", areas: "Koramangala, Indiranagar, HSR Layout, Whitefield, Electronic City, IISc" },
  { slug: "hyderabad", city: "Hyderabad", state: "Telangana", areas: "Hitec City, Madhapur, Gachibowli, Banjara Hills, Secunderabad, IIT Hyderabad" },
  { slug: "chennai", city: "Chennai", state: "Tamil Nadu", areas: "T. Nagar, Velachery, Adyar, IIT Madras Campus, OMR, Anna Nagar" },
  { slug: "coimbatore", city: "Coimbatore", state: "Tamil Nadu", areas: "Gandhipuram, RS Puram, Peelamedu, Saibaba Colony" },
  { slug: "vellore", city: "Vellore", state: "Tamil Nadu", areas: "VIT Campus, Katpadi, Gandhi Nagar, Bagayam" },
  { slug: "manipal", city: "Manipal", state: "Karnataka", areas: "MAHE Campus, Tiger Circle, End Point, Vidyaratna Nagar" },
  { slug: "kochi", city: "Kochi", state: "Kerala", areas: "Kakkanad, Edappally, MG Road, Fort Kochi, Marine Drive" },
  { slug: "visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", areas: "Dwaraka Nagar, MVP Colony, Gajuwaka, Siripuram, Rushikonda" },
];

export default cities;