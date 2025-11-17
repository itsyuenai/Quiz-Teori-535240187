import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import Prisma client kita

// [C]REATE: Membuat post baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal membuat post' },
      { status: 500 }
    );
  }
}

// [R]EAD: Mendapatkan semua post
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil posts' },
      { status: 500 }
    );
  }
}