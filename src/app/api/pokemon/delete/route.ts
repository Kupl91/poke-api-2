//C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\app\api\pokemon\delete\route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    // Если ID не указан, возвращаем ошибку
    return NextResponse.json({ error: 'ID не указан' }, { status: 400 })
  }
  try {
    await prisma.$transaction([
      prisma.pokemonAbility.deleteMany({
        where: { pokemonId: Number(id) },
      }),
      prisma.pokemon.delete({
        where: { id: Number(id) },
      }),
    ])

    return NextResponse.json({ message: 'Покемон успешно удален' }, { status: 200 })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
    console.error('Ошибка при удалении покемона:', errorMessage)

    return new Response(JSON.stringify({ error: 'Не удалось удалить покемона', details: errorMessage }), {
      status: 500,
    })
  }
}
