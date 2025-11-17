import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const updatedItem = await prisma.wishlistItem.update({
      where: { id: Number(params.id) }, 
      data: {
        title: body.title,
        description: body.description,
        done: body.done,
        priority: body.priority,
        category: body.category,
      },
    });
    return NextResponse.json(updatedItem);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal memperbarui item' },
      { status: 500 }
    );
  }
}

// [D]ELETE: Menghapus item by ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    await prisma.wishlistItem.delete({
      where: { id: Number(params.id) }, // Gunakan Number()
    });
    return NextResponse.json({ message: 'Item berhasil dihapus' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal menghapus item' },
      { status: 500 }
    );
  }
}