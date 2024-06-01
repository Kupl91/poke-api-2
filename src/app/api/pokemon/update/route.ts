//C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\app\api\pokemon\update\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, weight, height, species, experience, abilities = [] } = body;

    if (!id || isNaN(id) || !name || !species || isNaN(weight) || isNaN(height) || isNaN(experience)) {
      return NextResponse.json({ message: "Неверные данные" }, { status: 400 });
    }

    const existingPokemon = await prisma.pokemon.findUnique({
      where: { id: Number(id) },
    });

     if (!existingPokemon) {
      return new Response(JSON.stringify({ message :`Покемон не найден`}),{status :404});
     }
    
     const updatedPokemon = await prisma.pokemon.update({
       where:{id:Number(id)},
       data:{
        name,
        weight:Number(weight),
        height:Number(height),
        species,
        experience:Number(experience),
}
});

await prisma.pokemonAbility.deleteMany({
where:{pokemonId :Number (id)},
})

await prisma.pokemonAbility.createMany({
data :abilities.map((ability)=>({ability,pokemonId:Number (id)})),
});

 return new Response(JSON.stringify(updatedPokemon),{
 status :200
 });

} catch (error){
console.error('Ошибка при обновлении покемона', error.message);

return new Response(JSON.stringify({message:error.message}),
{status:500});
}
}