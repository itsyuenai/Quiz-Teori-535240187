import prisma from '@/lib/prisma';
import ItemList from '../../components/ItemList';
import { Suspense } from 'react';

type ItemType = {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
  done: boolean;
  priority: boolean;
  category: string | null;
};

async function getWishlistItems() {
  const items = await prisma.wishlistItem.findMany({
   orderBy: [
  { priority: 'desc' },
  { done: 'asc' },
  { createdAt: 'desc' }
]  });

  return items.map((item: { createdAt: { toISOString: () => never; }; }) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  })) as ItemType[];
}

export default async function ListPage() {
  const items = await getWishlistItems();

  return (
    <section>
      <h2 className="h4 mb-4">Wishlist Anda (dari Database)</h2>

      <Suspense fallback={<p>Loading...</p>}>
        <ItemList items={items} />
      </Suspense>
    </section>
  );
}