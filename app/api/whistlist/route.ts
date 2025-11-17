import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Pastikan path ini benar

// [R]EAD: Mendapatkan semua item wishlist
export async function GET() {
  try {
    const items = await prisma.wishlistItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(items);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data wishlist' },
      { status: 500 }
    );
  }
}

// [C]REATE: Membuat item wishlist baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Ambil data DARI FORM (tanpa id/createdAt)
    const { title, description, category } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title wajib diisi' },
        { status: 400 }
      );
    }

    const newItem = await prisma.wishlistItem.create({
      data: {
        title,
        description,
        category,
        // done, priority, createdAt akan diisi oleh default value
      },
    });
    // Kembalikan item LENGKAP ke frontend
    return NextResponse.json(newItem, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal membuat item wishlist' },
      { status: 500 }
    );
  }
}