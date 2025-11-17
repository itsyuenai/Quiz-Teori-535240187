'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

type ItemType = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  done?: boolean;
  priority?: boolean;
};

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [items] = useLocalStorage<ItemType[]>('wishlist-items', []);
  const item = items.find((it) => it.id === id);

  if (!item) {
    return (
      <div className="card p-4 p-md-5 shadow-sm mt-4 text-center">
        <h4 className="mb-3">
          <i className="bi bi-emoji-frown me-2"></i>
          Wishlist tidak ditemukan
        </h4>
        <p className="text-muted">Data mungkin sudah dihapus atau link ID tidak valid.</p>

        <button
          className="btn btn-outline-dark mt-3 mx-auto"
          style={{ maxWidth: '200px' }}
          onClick={() => router.push('/list')}
        >
          <i className="bi bi-arrow-left me-1"></i> Kembali ke List
        </button>
      </div>
    );
  }

  return (
    <div
      className="card shadow-sm mt-4 border-0"
      style={{ animation: 'fadein 0.4s ease' }}
    >
      <div className="card-body p-4 p-md-5">
        <h2 className="fw-bold mb-3">
          {item.priority && <i className="bi bi-star-fill me-2 text-warning"></i>}
          {item.done && <i className="bi bi-check2-circle me-2 text-success"></i>}
          {item.title}
        </h2>

        <div className="text-muted small mb-4">
          <p className="mb-0">
            <strong>ID:</strong> {item.id}
          </p>
          <p className="mb-0">
            <strong>Ditambahkan:</strong> {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>

        <h6 className="fw-bold">Deskripsi / Catatan</h6>
        <p className="lead">
          {item.description && item.description.trim() !== ''
            ? item.description
            : <span className="text-muted">Tidak ada deskripsi.</span>}
        </p>

        <hr className="my-4" />

        <button
          className="btn btn-dark mt-3"
          onClick={() => router.push('/list')}
        >
          <i className="bi bi-arrow-left me-1"></i> Kembali ke Wishlist
        </button>
      </div>
    </div>
  );
}