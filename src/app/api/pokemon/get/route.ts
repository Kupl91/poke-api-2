// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\app\api\pokemon\get\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return new Response(JSON.stringify({ message: 'ID не указан' }), { status: 400 });

    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        abilities: {
          include: {
            ability: true,
          },
        },
      },
    });

    if (!pokemon) return new Response(JSON.stringify({ message : "Покемон не найден" }), {status :404});
    
   // Форматируем данные для возвращаемого ответа
   const responseData={
         id:pokemon.id,
         name:pokemon.name,
         weight:pokemon.weight,
         height:pokemon.height,
         species:pokemon.species ,
         experience:
             pokemon.experience ,
       abilities:
             pokemon.abilities.map((pa )=>
                pa.ability ),
   };

return new Response(JSON.stringify(responseData), { status :200 });

} catch (error){
       const errorMessage= error instanceof Error ? error.message :'Неизвестная ошибка';
       console.error('Ошибка получения покемона:',errorMessage);

return new Response(JSON.stringify({message:'Внутренняя ошибка сервера',details:errorMessage}),{
status :500 });
}
}