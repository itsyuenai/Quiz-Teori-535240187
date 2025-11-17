import prisma from '@/lib/prisma'; // 1. Import Prisma
import EditForm from '../../../components/EditForm'; // 2. Import EditForm (Client Component)
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

// 3. Buat fungsi async untuk mengambil SATU item
async function getItem(id: string) {
  const item = await prisma.wishlistItem.findUnique({
    where: { id: Number(id) },
  });
  
  if (!item) {
    notFound(); // 4. Jika item tidak ada, panggil 404
  }
  
  // 5. Konversi 'createdAt' agar aman dikirim ke client
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
  };
}

// 6. Halaman menjadi 'async' Server Component
export default async function DetailPage({ params }: PageProps) {
  const item = await getItem(params.id);

  return (
    <div>
      <h2 className="fw-bold mb-3">
        {/* <i className="bi bi-pencil-square me-2"></i> */}
        Edit Wishlist
      </h2>
      <p className="text-muted mb-4">
        Anda sedang mengedit item: <strong>{item.title}</strong>
      </p>
      
      {/* 7. Render EditForm dan berikan data 'item' sebagai prop */}
      <EditForm item={item} />
    </div>
  );
}