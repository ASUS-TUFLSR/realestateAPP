import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [prop, setProp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!res.ok) throw new Error("Property not found");
        const data = await res.json();
        setProp(data);
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-8">Loading…</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!prop) return <div className="p-8">No property found.</div>;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-serif font-bold text-gray-800">{prop.title}</h1>
      <p className="text-sm text-gray-500 mt-1">by {prop.builderName}</p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <img src={prop.mainImage} alt={prop.title} className="w-full h-96 object-cover rounded-lg" />
          {prop.gallery && prop.gallery.length > 0 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {prop.gallery.map((g, i) => (
                <img key={i} src={g} alt={`${prop.title}-${i}`} className="w-44 h-28 object-cover rounded" />
              ))}
            </div>
          )}

          <section className="mt-6">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="mt-2 text-gray-700">{prop.description}</p>
          </section>
        </div>

        <aside className="p-4 border rounded-lg">
          <div className="text-xl font-bold text-indigo-600">₹ {prop.price.toLocaleString()}</div>
          <div className="mt-4 text-gray-600">
            <div><strong>Location:</strong> {prop.location}</div>
            <div className="mt-2"><strong>Builder:</strong> {prop.builderName}</div>
            <div className="mt-2"><strong>Posted:</strong> {new Date(prop.createdAt).toLocaleDateString()}</div>
          </div>

          <button
            className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Contact Seller
          </button>
        </aside>
      </div>
    </main>
  );
}
