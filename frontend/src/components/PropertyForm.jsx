import { useState } from 'react';
import { useRouter } from 'next/router';

const PropertyForm = ({ initial = {}, onSuccess }) => {
  const [form, setForm] = useState({
    title: initial.title || '',
    builderName: initial.builderName || '',
    location: initial.location || '',
    price: initial.price || '',
    description: initial.description || ''
  });
  const [mainImage, setMainImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const router = useRouter();

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    if (mainImage) fd.append('mainImage', mainImage);
    for (let i = 0; i < gallery.length; i++) fd.append('gallery', gallery[i]);

    const token = localStorage.getItem('admin_token');
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties${initial.id ? '/' + initial.id : ''}`, {
    //   method: initial.id ? 'PUT' : 'POST',
    //   headers: { Authorization: `Bearer ${token}` },
    //   body: fd
    // });
    const res = await fetch(`http://localhost:5000/api/properties${initial.id ? '/' + initial.id : ''}`, {
      method: initial.id ? 'PUT' : 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    if (res.ok) {
      alert('Success');
      if (onSuccess) onSuccess();
      else router.push('/admin/dashboard');
    } else {
      const err = await res.json();
      alert(err.message || 'Failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 600 }}>
      <input name="title" placeholder="Title" value={form.title} onChange={onChange} />
      <input name="builderName" placeholder="Builder Name" value={form.builderName} onChange={onChange} />
      <input name="location" placeholder="Location" value={form.location} onChange={onChange} />
      <input name="price" placeholder="Price" value={form.price} onChange={onChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} />
      <div>
        <label>Main Image</label>
        <input type="file" accept="image/*" onChange={e => setMainImage(e.target.files[0])} />
      </div>
      <div>
        <label>Gallery Images</label>
        <input type="file" accept="image/*" multiple onChange={e => setGallery([...e.target.files])} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default PropertyForm;