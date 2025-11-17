'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah form refresh halaman
    setIsLoading(true);

    // Kirim data ke API route kita
    await fetch('/api/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        url,
        price: price ? parseFloat(price) : null,
      }),
    });

    setIsLoading(false);
    // Reset form
    setName('');
    setUrl('');
    setPrice('');

    // Refresh data di halaman (ini akan memicu fetch ulang di server)
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-3 bg-light">
      <h3 className="mb-3">Tambah Item Wishlist Baru</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nama Barang
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="form-label">
          URL (Opsional)
        </label>
        <input
          type="text"
          className="form-control"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Harga (Opsional)
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Menyimpan...' : 'Simpan'}
      </button>
    </form>
  );
}