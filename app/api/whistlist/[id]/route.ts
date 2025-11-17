import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function DELETE(_: Request, { params }: any) {
  const id = Number(params.id);

  await prisma.wishlist.delete({ where: { id } });
  return Response.json({ message: 'Deleted' });
}

export async function PUT(req: Request, { params }: any) {
  const id = Number(params.id);
  const body = await req.json();

  const updated = await prisma.wishlist.update({
    where: { id },
    data: body,
  });
  return Response.json(updated);
}
