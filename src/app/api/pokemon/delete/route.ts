//C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\app\api\pokemon\delete\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID не указан' },
        { status: 400 }
      );
    }

    await prisma.$transaction([
      prisma.pokemonAbility.deleteMany({
        where: { pokemonId: Number(id) },
      }),
      prisma.pokemon.delete({
        where: { id: Number(id) },
      }),
    ]);

    return NextResponse.json({ message: 'Покемон успешно удален' }, 
                             { status: 200 });
  } catch (error) {
    console.error('Ошибка при удалении покемона:', error);
    
   return new Response(JSON.stringify({ error:`Не удалось удалить покемона`, details:error.message}),{status :500});
     
}
}