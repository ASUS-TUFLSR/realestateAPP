import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`);
    const res = await fetch(`http://localhost:5000/api/properties`);
    const data = await res.json();
    setProperties(data);
  }

  async function handleDelete(id) {
    if (!confirm('Delete?')) return;
    const token = localStorage.getItem('admin_token');
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/${id}`, {
    //   method: 'DELETE',
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) load();
    else alert('Delete failed');
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <Link href="/admin/add-property">Add Property</Link>
      <div style={{ marginTop: 16 }}>
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Title</th><th>Location</th><th>Price</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.location}</td>
                <td>{p.price}</td>
                <td>
                  <Link href={`/admin/edit/${p.id}`}>Edit</Link>
                  {' | '}
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
