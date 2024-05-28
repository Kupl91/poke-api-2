// C:\Users\Pavel\poke-api-2\src\app\api\pokemon\get\route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: 'ID не указан' }, { status: 400 });
    }

    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!pokemon) {
      return NextResponse.json({ message: 'Покемон не найден' }, { status: 404 });
    }

    return NextResponse.json(pokemon);
  } catch (error) {
    console.error(error);
    
return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
}
}