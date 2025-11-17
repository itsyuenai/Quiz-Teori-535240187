'use client';
import React, { useState } from 'react';
import ItemCard from './ItemCard';

type ItemType = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  done?: boolean;
  priority?: boolean;
  category?: string;
};

function generateNumericId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function ItemList({
  items,
  setItems,
}: {
  items: ItemType[];
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}) {
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

    const newItem: ItemType = {
      id: generateNumericId(),
      title: title.trim(),
      description: desc.trim(),
      createdAt: new Date().toISOString(),
      done: false,
      priority: false,
      category,
    };

    const res = await fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    const saved = await res.json();

    setItems(prev => [saved, ...prev]);

    setTitle('');
    setDesc('');
  }

  function deleteItem(id: string) {
    setItems(prev => prev.filter(it => it.id !== id));
  }

  function toggleDone(id: string) {
    setItems(prev =>
      prev.map(it => (it.id === id ? { ...it, done: !it.done } : it))
    );
  }

  function togglePriority(id: string) {
    setItems(prev =>
      prev.map(it => (it.id === id ? { ...it, priority: !it.priority } : it))
    );
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
          <h5 className="fw-bold mb-3">
            <i className="bi bi-plus-circle me-2"></i>
            Tambah Wishlist
          </h5>

          <form onSubmit={addItem} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Judul</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Catatan</label>
              <input
                value={desc}
                onChange={e => setDesc(e.target.value)}
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
              <button className="btn btn-dark">
                <i className="bi bi-plus-lg me-1"></i> Tambah
              </button>
            </div>
          </form>
        </div>
      </div>

      {paginated.length === 0 ? (
        <div className="alert alert-secondary">Tidak ada hasil.</div>
      ) : (
        <div className={grid ? 'row g-3' : ''}>
          {paginated.map(it =>
            grid ? (
              <div className="col-md-6 col-lg-4" key={it.id}>
                <ItemCard
                  item={it}
                  onDelete={deleteItem}
                  onToggleDone={toggleDone}
                  onTogglePriority={togglePriority}
                />
              </div>
            ) : (
              <ItemCard
                key={it.id}
                item={it}
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