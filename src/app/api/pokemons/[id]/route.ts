// C:\Users\Pavel\poke-api-2\src\app\api\pokemons\[id]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id: parseInt(id as string),
      },
      select: {
        id: true,
        name: true,
        weight: true,
        height:true ,
        species:true ,
        experience :true ,
         abilities:{
            select:{
               ability:{
                 select:{
                     name:true
                   }
                }
             }
           },
       },
   });

   if (!pokemon) {
     return NextResponse.json({ error:'Pokemon not found'},{status :404});
   }

   console.log('cerf');
  
   return NextResponse.json(pokemon);
 } 
 catch (error){
  return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
}
};