const KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export async function searchPlaces(text) {
  const url =
    `https://api.geoapify.com/v1/geocode/autocomplete` +
    `?text=${encodeURIComponent(text)}` +
    `&filter=countrycode:ke&bias=proximity:36.8219,-1.2921&limit=5&apiKey=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Could not load locations. Try again.");
  const data = await res.json();
  return data.features.map((f) => ({
    name: f.properties.formatted,
    lat: f.properties.lat,
    lon: f.properties.lon,
  }));
}