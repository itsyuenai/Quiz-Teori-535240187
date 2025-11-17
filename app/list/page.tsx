'use client';
import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ItemList from '../../components/ItemList';

type ItemType = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  done?: boolean;
  priority?: boolean;
};

export default function ListPage() {
  const [items, setItems] = useLocalStorage<ItemType[]>('wishlist-items', []);

  const sortedItems = [...items].sort((a, b) => {
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    if (!a.done && b.done) return -1;
    if (a.done && !b.done) return 1;
    return a.title.localeCompare(b.title);
  });

  return (
    <section>
      <h2 className="h4 mb-4">
        <i className="bi bi-list-stars me-2"></i>
        Wishlist Anda
      </h2>
      <ItemList items={sortedItems} setItems={setItems} />
    </section>
  );
}