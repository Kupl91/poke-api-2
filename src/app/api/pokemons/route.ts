// C:\Users\Pavel\poke-api-2\src\app\api\pokemons\route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
  const pokemons = await prisma.pokemon.findMany({
    select: {
      id: true,
      name: true,
      weight: true,
      height: true,
      species: true,
      experience: true,
      abilities: {
        select: {
          ability: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  })

  return NextResponse.json(pokemons)
}
