import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const pokemons = await prisma.pokemon.findMany()
    console.log(pokemons)

    return Response.json(pokemons)
}

export async function POST() {
    const pokemons = await prisma.pokemon.findMany()
    console.log(pokemons)

    return Response.json(pokemons)
}

export async function DELTE() {
    const pokemons = await prisma.pokemon.findMany()
    console.log(pokemons)

    return Response.json(pokemons)
}