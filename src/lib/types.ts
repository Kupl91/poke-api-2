// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\lib\types.ts

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  species: string;
  experience: number;
  abilities: { ability: { name: string } }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  weight: number;
  height: number;
  species: string;
  experience: number;
  abilities: { ability: { name: string } }[];
}

export const initialPokemonState = {
  id: -1,
  name: '',
  weight: -1,
  height: -1,
  species:'',
  experience:-1,
  abilities:[]
}
