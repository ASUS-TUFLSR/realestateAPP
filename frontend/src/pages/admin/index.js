import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from "../../components/PropertyCard"
import { fetchProperties } from "../../lib/api"

export default function Home() {
  const [propsList, setPropsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ location: '', minPrice: '', maxPrice: '', title: '' });

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties(q = {}) {
    setLoading(true);
    const query = new URLSearchParams(q).toString();
    // const url = `${import.meta.env.VITE_API_URL}/api/properties${query ? '?' + query : ''}`;
    const url = `http://localhost:5000/api/properties${query ? '?' + query : ''}`;
    const res = await fetchProperties(url);
    setPropsList(res || []);
    setLoading(false);
  }

  

  function onFilterChange(e) {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function applyFilters() {
    const qs = {};
    if (filters.location) qs.location = filters.location;
    if (filters.minPrice) qs.minPrice = filters.minPrice;
    if (filters.maxPrice) qs.maxPrice = filters.maxPrice;
    if (filters.title) qs.title = filters.title;
    loadProperties(qs);
  }

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Properties</h1>
        <Link href="/admin/login">Admin</Link>
      </header>

      <section style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input name="location" placeholder="Location" value={filters.location} onChange={onFilterChange} />
          <input name="title" placeholder="Project name" value={filters.title} onChange={onFilterChange} />
          <input name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={onFilterChange} />
          <input name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={onFilterChange} />
          <button onClick={applyFilters}>Filter</button>
        </div>
      </section>

      <main style={{ marginTop: 20 }}>
        {loading ? <p>Loading...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {propsList.map(p => <PropertyCard key={p.id} prop={p} />)}
          </div>
        )}
      </main>
    </div>
  );
}
