/**
 * Single source of truth for business information, verified ratings, and contact info.
 */
export const BUSINESS_INFO = {
  legalName: 'SRQ Engineers Parcel and Haul Private Limited',
  brandName: 'Engineers Parcel',
  rating: '4.7',
  reviewCount: 98,
  ratingText: '4.7★',
  reviewsLabel: '98 verified reviews',
  ratingBadge: '4.7★ Google Rating (98 verified reviews)',
  primaryPhone: '+919525801506',
  displayPhones: ['+91-9708815717', '+91-9525801506'],
  email: 'info@engineersparcel.in',
  address: {
    street: 'IIT (ISM) Police Line Road, Sardar Patel Nagar',
    locality: 'Dhanbad',
    region: 'Jharkhand',
    postalCode: '826004',
    country: 'IN',
  },
};

export const DHANBAD_PINCODES_EXAMPLES = ["826001", "826004", "826005", "828127"];

/**
 * Checks if a pincode belongs to Dhanbad district (where physical box supply is active).
 * Dhanbad pincodes start with 826 and 828 (e.g., 826001, 826004, 826005, 828127).
 */
export const isDhanbadPincode = (pincode, city = "") => {
  if (!pincode) return false;
  const pin = String(pincode).trim();
  if (!/^\d{6}$/.test(pin)) return false;
  if (city && city.toLowerCase().includes("dhanbad")) return true;
  return pin.startsWith("826") || pin.startsWith("828");
};

export default BUSINESS_INFO;
