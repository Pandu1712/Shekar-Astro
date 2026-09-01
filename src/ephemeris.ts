// Simplified ephemeris using Keplerian orbital elements.
// Computes geocentric ecliptic longitudes for the Sun, Moon, and 7 planets.
// Accuracy: ~1-2 degrees over 1900-2100 — sufficient for a natal chart wheel.

const DEG = Math.PI / 180;

export function toJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

function jct(jd: number): number {
  return (jd - 2451545.0) / 36525;
}

function normalize(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

// Solve Kepler's equation
function solveKepler(M: number, e: number): number {
  let E = M;
  for (let i = 0; i < 10; i++) {
    E = E + (M + e * Math.sin(E) - E) / (1 - e * Math.cos(E));
  }
  return E;
}

// Orbital elements at epoch J2000
// a (AU), e (eccentricity), I (inclination deg), L (mean longitude deg),
// longPeri (longitude of perihelion deg), longNode (longitude of ascending node deg)
interface OrbitalElements {
  a: number;
  e: number;
  I: number;
  L: number;
  longPeri: number;
  longNode: number;
  // rates of change per century
  Ldot: number;
  Idot: number;
  longPeriDot: number;
  longNodeDot: number;
  adot: number;
  edot: number;
}

const ELEMENTS: Record<string, OrbitalElements> = {
  mercury: { a: 0.38709927, e: 0.20563593, I: 7.00497902, L: 252.25032351, longPeri: 77.45779628, longNode: 48.33076593, Ldot: 149472.67421175, Idot: -0.0234372, longPeriDot: 0.160476, longNodeDot: -0.125340, adot: 0.00000037, edot: 0.00001906 },
  venus: { a: 0.72333566, e: 0.00677672, I: 3.39467605, L: 181.97909952, longPeri: 131.60246718, longNode: 76.67984255, Ldot: 58517.8156760, Idot: -0.0008768, longPeriDot: 0.055890, longNodeDot: -0.277694, adot: 0.00000390, edot: -0.00004107 },
  earth: { a: 1.00000261, e: 0.01671123, I: -0.00001531, L: 100.46457166, longPeri: 102.93768193, longNode: 0, Ldot: 35999.37306329, Idot: -0.01294668, longPeriDot: 0.323200, longNodeDot: 0, adot: 0.00000562, edot: -0.00004392 },
  mars: { a: 1.52371034, e: 0.09339410, I: 1.85061675, L: -4.55343205, longPeri: -23.94362959, longNode: 49.55953891, Ldot: 19140.30268499, Idot: -0.022771, longPeriDot: 0.452090, longNodeDot: -0.291876, adot: 0.00001847, edot: 0.00007909 },
  jupiter: { a: 5.20288700, e: 0.04838624, I: 1.30439657, L: 34.39644051, longPeri: 14.72847983, longNode: 100.47397908, Ldot: 3034.74612775, Idot: -0.001714, longPeriDot: 0.212684, longNodeDot: 0.130104, adot: -0.00002806, edot: -0.00001281 },
  saturn: { a: 9.53667594, e: 0.05386179, I: 2.48599187, L: 49.95424423, longPeri: 92.59887831, longNode: 113.66242448, Ldot: 1222.49364201, Idot: 0.025113, longPeriDot: -0.417690, longNodeDot: -0.250122, adot: 0.00003075, edot: -0.00002564 },
  uranus: { a: 19.18916464, e: 0.04725744, I: 0.77263783, L: 170.95427630, longPeri: 170.95427630, longNode: 74.01692503, Ldot: 428.48297973, Idot: -0.012040, longPeriDot: 0.452090, longNodeDot: 0.042417, adot: -0.00001355, edot: 0.00002700 },
  neptune: { a: 30.06992276, e: 0.00859033, I: 1.77004347, L: 5.95516918, longPeri: -73.5454320, longNode: 131.78422574, Ldot: 218.46561420, Idot: 0.010248, longPeriDot: 0.417690, longNodeDot: -0.260123, adot: 0.00001346, edot: 0.00002500 },
};

// Compute heliocentric position (x, y, z in AU) from orbital elements at time t
function helioPosition(elem: OrbitalElements, t: number): [number, number, number] {
  const a = elem.a + elem.adot * t;
  const e = elem.e + elem.edot * t;
  const I = (elem.I + elem.Idot * t) * DEG;
  const L = normalize(elem.L + elem.Ldot * t) * DEG;
  const longPeri = (elem.longPeri + elem.longPeriDot * t) * DEG;
  const longNode = (elem.longNode + elem.longNodeDot * t) * DEG;

  const M = L - longPeri; // mean anomaly
  const E = solveKepler(M, e); // eccentric anomaly

  // Position in orbital plane
  const xOrb = a * (Math.cos(E) - e);
  const yOrb = a * Math.sqrt(1 - e * e) * Math.sin(E);

  const omega = longPeri - longNode; // argument of perihelion
  const cosO = Math.cos(omega);
  const sinO = Math.sin(omega);
  const cosI = Math.cos(I);
  const sinI = Math.sin(I);
  const cosN = Math.cos(longNode);
  const sinN = Math.sin(longNode);

  // Rotate to heliocentric ecliptic coordinates
  const x = (cosO * cosN - sinO * sinN * cosI) * xOrb + (-sinO * cosN - cosO * sinN * cosI) * yOrb;
  const y = (cosO * sinN + sinO * cosN * cosI) * xOrb + (-sinO * sinN + cosO * cosN * cosI) * yOrb;
  const z = (sinO * sinI) * xOrb + (cosO * sinI) * yOrb;

  return [x, y, z];
}

// Moon position using simplified ELP-2000
function moonLongitude(jd: number): number {
  const t = jct(jd);
  const L = normalize(218.3164 + 481267.8813 * t);
  const D = normalize(297.8501921 + 445267.1114034 * t) * DEG;
  const Ms = normalize(357.5291092 + 35999.0502909 * t) * DEG;
  const Mm = normalize(134.9633964 + 477198.8675305 * t) * DEG;
  const F = normalize(93.272095 + 483202.0175233 * t) * DEG;

  const terms = [
    6.289 * Math.sin(Mm),
    1.274 * Math.sin(2 * D - Mm),
    0.658 * Math.sin(2 * D),
    0.214 * Math.sin(2 * Mm),
    -0.186 * Math.sin(Ms),
    -0.114 * Math.sin(F),
    0.059 * Math.sin(Mm - 2 * D + Ms),
    0.057 * Math.sin(Mm + 2 * D + Ms),
    0.053 * Math.sin(Mm + 2 * D - Ms),
    0.046 * Math.sin(2 * D - Ms),
    0.041 * Math.sin(Mm - Ms),
    -0.035 * Math.sin(D),
    -0.031 * Math.sin(Mm + F),
    -0.015 * Math.sin(2 * F - 2 * D),
  ];

  return normalize(L + terms.reduce((s, v) => s + v, 0));
}

export type PlanetName = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune';

export interface PlanetPosition {
  name: PlanetName;
  longitude: number;
  signIndex: number;
  signDegree: number;
  sign: string;
  retrograde: boolean;
  symbol: string;
  house: number;
}

const ZODIAC_SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
const PLANET_SYMBOLS: Record<PlanetName, string> = {
  Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂', Jupiter: '♃', Saturn: '♄', Uranus: '♅', Neptune: '♆',
};

function toZodiac(longitude: number): { signIndex: number; signDegree: number; sign: string } {
  const lon = normalize(longitude);
  const signIndex = Math.floor(lon / 30);
  return { signIndex, signDegree: lon - signIndex * 30, sign: ZODIAC_SIGNS[signIndex] };
}

// Ascendant calculation
export function calculateAscendant(jd: number, latitude: number, longitude: number): number {
  const t = jct(jd);
  const gst = normalize(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * t * t);
  const lst = normalize(gst + longitude) * DEG;
  const eps = (23.439291 - 0.0130042 * t) * DEG;
  const lat = latitude * DEG;

  // Ascendant
  const ascRad = Math.atan2(
    Math.cos(lst),
    -(Math.sin(lat) * Math.tan(eps) + Math.cos(lat) * Math.sin(lst))
  );
  return normalize(ascRad / DEG);
}

function geocentricLongitude(helioPlanet: [number, number, number], helioEarth: [number, number, number]): number {
  const dx = helioPlanet[0] - helioEarth[0];
  const dy = helioPlanet[1] - helioEarth[1];
  return normalize((Math.atan2(dy, dx) / DEG));
}

export function calculatePlanetPositions(date: Date, latitude: number, longitude: number): { planets: PlanetPosition[]; ascendant: number } {
  const jd = toJulianDay(date);
  const t = jct(jd);

  const earth = helioPosition(ELEMENTS.earth, t);

  const planetNames: PlanetName[] = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  const result: { name: PlanetName; lon: number; retro: boolean }[] = [];

  // Sun = geocentric Earth (opposite of heliocentric Earth)
  const sunLon = normalize((Math.atan2(-earth[1], -earth[0]) / DEG));
  result.push({ name: 'Sun', lon: sunLon, retro: false });

  // Moon
  result.push({ name: 'Moon', lon: moonLongitude(jd), retro: false });

  // Planets
  for (const name of planetNames) {
    const elem = ELEMENTS[name.toLowerCase()];
    const helio = helioPosition(elem, t);
    const lon = geocentricLongitude(helio, earth);

    // Retrograde: check if longitude decreases over next day
    const t2 = jct(jd + 1);
    const earth2 = helioPosition(ELEMENTS.earth, t2);
    const helio2 = helioPosition(elem, t2);
    const lon2 = geocentricLongitude(helio2, earth2);
    const retro = lon2 < lon;

    result.push({ name, lon, retro });
  }

  const ascendant = calculateAscendant(jd, latitude, longitude);

  const planets: PlanetPosition[] = result.map((p) => {
    const z = toZodiac(p.lon);
    return {
      name: p.name,
      longitude: p.lon,
      signIndex: z.signIndex,
      signDegree: z.signDegree,
      sign: z.sign,
      retrograde: p.retro,
      symbol: PLANET_SYMBOLS[p.name],
      house: 0,
    };
  });

  for (const p of planets) {
    const diff = normalize(p.longitude - ascendant);
    p.house = Math.floor(diff / 30) + 1;
  }

  return { planets, ascendant };
}

export { ZODIAC_SIGNS, ZODIAC_SYMBOLS, PLANET_SYMBOLS };
