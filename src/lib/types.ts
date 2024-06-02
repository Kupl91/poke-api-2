//C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\lib\types.ts
export interface Pokemon {
    id: number;
    name: string;
    weight: number;
    height: number;
    species: string;
    experience: number;
    abilities: { ability: { name: string } }[];
  }