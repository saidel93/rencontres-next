import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AddProfileForm() {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    image_url: '',
    category_id: '',
    city_id: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: citiesData, error: citiesError } = await supabase.from('Cities').select('*');
      const { data: categoriesData, error: categoriesError } = await supabase.from('Categories').select('*');

      if (citiesError) console.error('Error loading cities:', citiesError);
      if (categoriesError) console.error('Error loading categories:', categoriesError);

      setCities(citiesData || []);
      setCategories(categoriesData || []);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('profiles').insert([form]);

    if (error) {
      alert('Failed to create profile: ' + error.message);
    } else {
      alert('Profile created!');
      setForm({
        name: '',
        description: '',
        image_url: '',
        category_id: '',
        city_id: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="w-full border p-2"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
        className="w-full border p-2"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={form.image_url}
        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        required
        className="w-full border p-2"
      />

      <select
        value={form.category_id}
        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        required
        className="w-full border p-2"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <select
        value={form.city_id}
        onChange={(e) => setForm({ ...form, city_id: e.target.value })}
        required
        className="w-full border p-2"
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>{city.name}</option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Profile</button>
    </form>
  );
}
