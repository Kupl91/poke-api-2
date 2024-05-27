// C:\Users\Pavel\poke-api-2\src\app\api\pokemon\get\route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ message: 'ID не указан' }, { status: 400 });
    }

    try {
        const pokemon = await prisma.pokemon.findUnique({
            where: { id: parseInt(id, 10) }
        });

        if (!pokemon) {
            return NextResponse.json({ message: 'Покемон не найден' }, { status: 404 });
        }

        return NextResponse.json(pokemon);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
    }
}