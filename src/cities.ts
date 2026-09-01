// City database with latitude/longitude for birth chart calculations
export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
}

export const cities: City[] = [
  { name: 'Port Louis', country: 'Mauritius', lat: -20.1659, lon: 57.4896, timezone: 'Indian/Mauritius' },
  { name: 'Curepipe', country: 'Mauritius', lat: -20.3164, lon: 57.5191, timezone: 'Indian/Mauritius' },
  { name: 'Mumbai', country: 'India', lat: 19.076, lon: 72.8777, timezone: 'Asia/Kolkata' },
  { name: 'Delhi', country: 'India', lat: 28.6139, lon: 77.209, timezone: 'Asia/Kolkata' },
  { name: 'Chennai', country: 'India', lat: 13.0827, lon: 80.2707, timezone: 'Asia/Kolkata' },
  { name: 'Kolkata', country: 'India', lat: 22.5726, lon: 88.3639, timezone: 'Asia/Kolkata' },
  { name: 'Bangalore', country: 'India', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata' },
  { name: 'Ahmedabad', country: 'India', lat: 23.0225, lon: 72.5714, timezone: 'Asia/Kolkata' },
  { name: 'Pune', country: 'India', lat: 18.5204, lon: 73.8567, timezone: 'Asia/Kolkata' },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708, timezone: 'Asia/Dubai' },
  { name: 'Abu Dhabi', country: 'UAE', lat: 24.4539, lon: 54.3773, timezone: 'Asia/Dubai' },
  { name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
  { name: 'Manchester', country: 'UK', lat: 53.4808, lon: -2.2426, timezone: 'Europe/London' },
  { name: 'New York', country: 'USA', lat: 40.7128, lon: -74.006, timezone: 'America/New_York' },
  { name: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437, timezone: 'America/Los_Angeles' },
  { name: 'Chicago', country: 'USA', lat: 41.8781, lon: -87.6298, timezone: 'America/Chicago' },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832, timezone: 'America/Toronto' },
  { name: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207, timezone: 'America/Vancouver' },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631, timezone: 'Australia/Melbourne' },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198, timezone: 'Asia/Singapore' },
  { name: 'Hong Kong', country: 'China', lat: 22.3193, lon: 114.1694, timezone: 'Asia/Hong_Kong' },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.139, lon: 101.6869, timezone: 'Asia/Kuala_Lumpur' },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, timezone: 'Europe/Paris' },
  { name: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.405, timezone: 'Europe/Berlin' },
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041, timezone: 'Europe/Amsterdam' },
  { name: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417, timezone: 'Europe/Zurich' },
  { name: 'Johannesburg', country: 'South Africa', lat: -26.2041, lon: 28.0473, timezone: 'Africa/Johannesburg' },
  { name: 'Nairobi', country: 'Kenya', lat: -1.2921, lon: 36.8219, timezone: 'Africa/Nairobi' },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Other / Custom', country: '', lat: 0, lon: 0, timezone: 'UTC' },
];

export function searchCities(query: string): City[] {
  if (!query.trim()) return cities.slice(0, 8);
  const q = query.toLowerCase();
  return cities.filter((c) => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)).slice(0, 10);
}
