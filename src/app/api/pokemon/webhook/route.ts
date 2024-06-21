// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\app\api\pokemon\webhook\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создайте кэш данных вне функции POST
let pokemonCache: { [key: number]: any } = {};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id }: { id: number } = body;

    if (!id || isNaN(id)) {
      return NextResponse.json({ message : "Неверные данные" },{status :400});
    }

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: Number(id) },
      include: {
        abilities: {
          include: {
            ability: true,
          },
        },
      },
    });

    if (!pokemon) {
      return new Response(JSON.stringify({ message :"Покемон не найден"}),{
        status :404
      });
    }

    // Обновите ваш кэш данных прямо здесь
    pokemonCache[id] = pokemon;

    return new Response(JSON.stringify(pokemon),{
      status :200
    });

  } catch (error) {
    const errorMessage= error instanceof Error ? error.message :'Неизвестная ошибка';
    console.error('Ошибка при обработке веб-хука:',errorMessage);

    return new Response(JSON.stringify({message:errorMessage}),{
      status :500 
    });
  }
}

