// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\app\api\pokemon\create\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, weight, height, species, experience, abilities = [] }: 
          { name: string; weight: number; height: number; species: string; experience: number; abilities: Array<{ abilityId: number }> } = body;

    if (!name || !species || isNaN(weight) || isNaN(height) || isNaN(experience)) {
      return NextResponse.json({ message : "Неверные данные" },{status :400});
}
   
        const existingPokemon = await prisma.pokemon.findUnique({
        where:{name},
       });

if ( existingPokemon){
return new Response(JSON.stringify({message :"Покемон с таким именем уже существует"}),{
status :400});
}

           const newPokemon = await prisma.pokemon.create({
            data:{
              name,
              weight:Number(weight),
              height:Number(height),
               species,
               experience:Number(experience),

                    abilities:{
                createMany:{
                   data :abilities.map(({abilityId})=> ({ abilityId }))
                      }
                    }
                   }
                 });

return new Response(JSON.stringify(newPokemon),{
         status :201
});

} catch (error ){
const errorMessage= error instanceof Error ? error.message :'Неизвестная ошибка';
console.error('Ошибка при создании нового покемона:',errorMessage);

return new Response(JSON.stringify({message:errorMessage}),{
status :500 
      });
     }
   }