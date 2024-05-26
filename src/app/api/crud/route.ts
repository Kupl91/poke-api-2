// C:\Users\Pavel\poke-api-2\src\app\api\crud\route.ts
'use server'
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const pokemons = await prisma.pokemon.findMany();
        return NextResponse.json(pokemons);
    } catch (error) {
        console.error('Ошибка получения покемонов:', error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Неверные данные" });
    }

    const { name, weight, height, species, experience, abilities = [] } = req.body;

    if (!name || !species || isNaN(weight) || isNaN(height) || isNaN(experience)) {
      return res.status(400).json({ message: "Неверные данные" });
    }

    const existingPokemon = await prisma.pokemon.findUnique({
      where: { name },
    });

    if (existingPokemon) {
      return res.status(400).json({ message: "Покемон с таким именем уже существует" });
    }

    const newPokemon = await prisma.pokemon.create({
      data: {
        name,
         weight: Number(weight),
        height: Number(height),
         species,
        experience: Number(experience),
        abilities: {
          createMany: {
            data: abilities.map((ability) => ({ ability })),
          },
        },
      },
    });

    return res.status(201).json(newPokemon);
  } catch (error) {
    console.error('Ошибка при создании нового покемона', error.message);
    return res.status(500).json({ message: error.message });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.params;
    await prisma.$transaction([
      prisma.pokemonAbility.deleteMany({
        where: { pokemonId: Number(id) },
      }),
      prisma.pokemon.delete({
        where: { id: Number(id) },
       }),
    ]);
    res.status(200).json({ message: 'Покемон успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении покемона:', error);
    res.status(500).json({ error: 'Ошибка при удалении покемона' + error.message });
  }
}