'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Tipe data ini harus cocok dengan schema.prisma
type ItemType = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  done: boolean;
  priority: boolean;
};

interface EditFormProps {
  item: ItemType;
}

export default function EditForm({ item }: EditFormProps) {
  // 1. Isi state dengan data item yang ada
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description || '',
    category: item.category || 'Umum',
    priority: item.priority,
    done: item.done,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // 2. Handle submit untuk 'PUT' (Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await fetch(`/api/wishlist/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setIsLoading(false);
    // 3. Kembali ke list dan refresh data
    router.push('/list');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="card shadow-sm border-0">
      <div className="card-body p-4 p-md-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Deskripsi / Catatan</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Kategori</label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Umum</option>
            <option>Elektronik</option>
            <option>Fashion</option>
            <option>Kecantikan</option>
            <option>Rumah</option>
          </select>
        </div>
        <div className="d-flex gap-4 mb-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="priority"
              name="priority"
              checked={formData.priority}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="priority">Prioritas</label>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="done"
              name="done"
              checked={formData.done}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="done">Sudah Dibeli (Done)</label>
          </div>
        </div>
        <hr className="my-4" />
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-dark" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          <Link href="/list" className="btn btn-outline-secondary">
            Batal
          </Link>
        </div>
      </div>
    </form>
  );
}