
// console.log("ENV:", import.meta.env.VITE_API_URL);
// const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


export async function fetchProperties() {
  const res = await fetch(`http://localhost:5000/api/properties`);
  return res.json();
}

// console.log("ENV CHECK:", import.meta.env.VITE_API_URL);


