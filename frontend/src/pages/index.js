import { useEffect, useState } from "react";
import { fetchProperties } from "../lib/api";
import PropertyCard from "../components/PropertyCard"

export default function HomePage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties().then(setProperties);
  }, []);

  return (
    
    
    <div className="fixed inset-0 -z-10">
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
  <img
    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    alt="Background"
    className="w-full h-full object-cover opacity-5"
  />
       {properties.map((prop) => (
        <PropertyCard key={prop.id} prop={prop} />
      ))}
</div>
  );
}
