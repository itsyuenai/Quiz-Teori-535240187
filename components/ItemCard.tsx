'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type Item = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  done?: boolean;
  priority?: boolean;
};

export default function ItemCard({
  item,
  onDelete,
  onToggleDone,
  onTogglePriority,
}: {
  item: Item;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
  onTogglePriority: (id: string) => void;
}) {
  const router = useRouter();

  return (
    <div
      className="card mb-3 shadow-sm"
      style={{
        border: item.priority ? '2px solid black' : '1px solid #ddd',
        opacity: item.done ? 0.65 : 1,
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-start">
        <div style={{ maxWidth: "75%" }}>

          {/* JUDUL → LINK KE DETAIL */}
          <button
            onClick={() => router.push(`/list/${item.id}`)}
            className="h5 bg-transparent border-0 p-0 text-decoration-none mb-1"
            style={{ cursor: "pointer", textAlign: "left" }}
          >
            {item.priority && (
              <i className="bi bi-star-fill me-2 text-warning"></i>
            )}
            {item.done && (
              <i className="bi bi-check2-circle me-2 text-success"></i>
            )}
            {item.title}
          </button>

          {/* ID DITAMPILKAN DI SINI */}
          <p className="text-muted small mb-2">
            <strong>ID:</strong> {item.id}
          </p>

          {/* DESKRIPSI */}
          <p className="text-muted small mb-1">
            {item.description || 'Tidak ada deskripsi'}
          </p>

          {/* TANGGAL */}
          <div className="text-muted small mb-2">
            Ditambahkan: {new Date(item.createdAt).toLocaleString()}
          </div>

          {/* STATUS */}
          {item.done ? (
            <span className="badge bg-success">✔ Wishlist Tercapai</span>
          ) : (
            <span className="badge bg-secondary">Belum Tercapai</span>
          )}
        </div>

        {/* BAGIAN KANAN TOMBOL */}
        <div className="d-flex flex-column align-items-end">

          {/* Toggle selesai */}
          <button
            className="btn btn-sm btn-outline-secondary mb-2"
            onClick={() => onToggleDone(item.id)}
          >
            {item.done ? (
              <>
                <i className="bi bi-arrow-counterclockwise me-1"></i>
                Batalkan
              </>
            ) : (
              <>
                <i className="bi bi-check2-circle me-1"></i>
                Selesai
              </>
            )}
          </button>

          {/* Toggle prioritas */}
          <button
            className="btn btn-sm btn-outline-dark mb-2"
            onClick={() => onTogglePriority(item.id)}
          >
            {item.priority ? (
              <>
                <i className="bi bi-star me-1"></i> Lepas Prioritas
              </>
            ) : (
              <>
                <i className="bi bi-star-fill me-1"></i> Jadikan Utama
              </>
            )}
          </button>

          {/* Delete */}
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(item.id)}
          >
            <i className="bi bi-trash"></i>
          </button>

        </div>
      </div>
    </div>
  );
}