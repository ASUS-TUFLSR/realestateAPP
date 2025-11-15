import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropertyForm from '../../../components/PropertyForm';

export default function EditProperty() {
  const router = useRouter();
  const { id } = router.query;
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    if (!id) return;
    // fetch(`${import.meta.env.VITE_API_URL}/api/properties/${id}`)
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then(r => r.json())
      .then(setInitial);
  }, [id]);

  if (!initial) return <div style={{ padding: 20 }}>Loading...</div>;

  return <div style={{ padding: 20 }}>
    <h2>Edit Property</h2>
    <PropertyForm initial={initial} />
  </div>;
}
