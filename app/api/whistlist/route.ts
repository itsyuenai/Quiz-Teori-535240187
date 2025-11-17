import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.wishlist.findMany({
    orderBy: { id: 'desc' }
  });
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const item = await prisma.wishlist.create({ data: body });
  return Response.json(item);
}
