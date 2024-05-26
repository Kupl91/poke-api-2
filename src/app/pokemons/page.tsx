// C:\Users\Pavel\poke-api-2\src\app\pokemons\page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import FilterAndSort from '@/components/ui/FilterAndSort';
import Pagination from '@/components/ui/Pagination';
import PokemonList from '@/components/ui/PokemonList';
import PokemonForm from '@/components/ui/PokemonForm';
import { usePokemonActions } from '@/lib/pokeActions';
import { Button, buttonVariants } from '@/components/ui/button';

// Serever action
// async function getPokemons() {
//   const res = await fetch("http://localhost:3000/api/pokemons")
//   return res.json()
// }

// // const PokemonsPage = async () => {

// //   const allPokemons = await getPokemons();


const PokemonsPage = () => {
  const {
    pokemons,
    selectedDetail,
    newPokemon,
    updatingPokemon,
    fetchPokemons,
    handleDetailsClick,
    handleDeleteClick,
    handleSubmitClick,
    handleUpdateSubmit,
    handleUpdateClick,
    handleSortChange,
    handleFilterTypeChange,
    handleFilterValueChange,
    sortedAndFilteredPokemons,
    handleUpdateInputChange,
    handleInputChange,
    showForm, 
    handleCreateClick,
    currentPage,
    itemsPerPage,
    previousPage,
    nextPage, 
  } = usePokemonActions();

  return (
    <div className='bg-black-500'>
      
      <FilterAndSort 
        handleSortChange={handleSortChange} 
        handleFilterTypeChange={handleFilterTypeChange}
        handleFilterValueChange={handleFilterValueChange}
      />
      <PokemonList 
        pokemons={sortedAndFilteredPokemons}
        handleDeleteClick={handleDeleteClick}
        handleDetailsClick={handleDetailsClick}
        handleUpdateSubmit={handleUpdateSubmit}
        handleUpdateClick={handleUpdateClick}
        handleUpdateInputChange={handleUpdateInputChange}
        selectedDetail={selectedDetail}
        updatingPokemon={updatingPokemon}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={Math.ceil(sortedAndFilteredPokemons.length / itemsPerPage)}
        nextPage={nextPage}
        previousPage={previousPage}
      />
      <PokemonForm
       handleSubmitClick={handleSubmitClick}
       handleInputChange={handleInputChange}
       handleCreateClick={handleCreateClick}
       newPokemon={newPokemon}
       showForm={showForm} 
      />
      <Button variant="outline">Херов тейлвинд, рот его ебал</Button> 

    </div>
  );
};

export default PokemonsPage;