import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ message: 'ID не указан' }, { status: 400 });

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

    if (!pokemon) return NextResponse.json({ message : "Покемон не найден"},{
status :404});
    
   // Форматируем данные для возвращаемого ответа
const responseData={
         id:pokemon.id,
         name:pokemon.name,
     weight:pokemon.weight,
     height:pokemon.height,
species:pokemon.species ,
experience:
pokemon.experience ,abilities:
         pokemon.abilities.map((pa )=>({
           ability :
            pa.ability })),
   };

return 
NextResponse.json(responseData);
   
} catch (error){
       const errorMessage= error instanceof Error ? error.message :'Неизвестная ошибка';
       console.error('Ошибка получения покемона:',errorMessage);

return new Response(JSON.stringify({message:'Внутренняя ошибка сервера',details:errorMessage}),{
status :500 });
}
}