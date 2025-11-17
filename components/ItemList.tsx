'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ItemCard from './ItemCard';

type ItemType = {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
  done: boolean;
  priority: boolean;
  category: string | null;
};

export default function ItemList({ items }: { items: ItemType[] }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Umum');
  const [search, setSearch] = useState('');
  const [grid, setGrid] = useState(false);

  const itemsPerPage = 5;
  const [page, setPage] = useState(1);

  const filtered = items.filter((it) =>
    it.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        description: desc.trim(),
        category,
      }),
    });

    router.refresh();
    setTitle('');
    setDesc('');
  }

  async function deleteItem(id: number) {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;

    await fetch(`/api/wishlist/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  async function toggleDone(id: number) {
    const item = items.find((it) => it.id === id);
    if (!item) return;

    await fetch(`/api/wishlist/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !item.done }),
    });

    router.refresh();
  }

  async function togglePriority(id: number) {
    const item = items.find((it) => it.id === id);
    if (!item) return;

    await fetch(`/api/wishlist/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priority: !item.priority }),
    });

    router.refresh();
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="form-control me-2"
          placeholder="Cari wishlist..."
          style={{ maxWidth: 250 }}
        />

        <button
          className="btn btn-outline-dark"
          onClick={() => setGrid(!grid)}
        >
          {grid ? 'Mode List' : 'Mode Grid'}
        </button>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Tambah Wishlist</h5>

          <form onSubmit={addItem} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Judul</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Catatan</label>
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Kategori</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Umum</option>
                <option>Elektronik</option>
                <option>Fashion</option>
                <option>Kecantikan</option>
                <option>Rumah</option>
              </select>
            </div>

            <div className="col-12">
              <button className="btn btn-dark">Tambah</button>
            </div>
          </form>
        </div>
      </div>

      {paginated.length === 0 ? (
        <div className="alert alert-secondary">Tidak ada hasil.</div>
      ) : (
        <div className={grid ? 'row g-3' : ''}>
          {paginated.map((it) =>
            grid ? (
              <div className="col-md-6 col-lg-4" key={it.id}>
                <ItemCard
                  item={{
                    ...it,
                    description: it.description ?? undefined,
                    category: it.category ?? undefined,
                  }}
                  onDelete={deleteItem}
                  onToggleDone={toggleDone}
                  onTogglePriority={togglePriority}
                />
              </div>
            ) : (
              <ItemCard
                key={it.id}
                item={{
                  ...it,
                  description: it.description ?? undefined,
                  category: it.category ?? undefined,
                }}
                onDelete={deleteItem}
                onToggleDone={toggleDone}
                onTogglePriority={togglePriority}
              />
            )
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-dark me-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="px-3 py-2">
            {page} / {totalPages}
          </span>
          <button
            className="btn btn-outline-dark ms-2"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}