import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "../components/PropertyCard";

export default function ListingsPage() {
  const [propsList, setPropsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadProperties() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/properties");
      if (!res.ok) throw new Error("Failed to load properties");
      const data = await res.json();
      setPropsList(data);
    } catch (err) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-gray-800">All Listings</h1>
        <p className="text-sm text-gray-500">{propsList.length} properties</p>
      </header>

      {loading && <p className="text-center py-20">Loading listings…</p>}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">{error}</p>
          <button onClick={loadProperties} className="px-4 py-2 bg-indigo-600 text-white rounded">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propsList.map((p) => (
            <Link key={p.id} href={`/property/${p.id}`} className="block">
              <PropertyCard prop={p} />
            </Link>
          ))}
        </section>
      )}

      {!loading && !error && propsList.length === 0 && (
        <p className="text-center py-20 text-gray-600">No properties found.</p>
      )}
    </main>
  );
}
