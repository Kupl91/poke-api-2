// C:\Users\Pavel\poke-api-2\src\app\pokemons\page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import FilterAndSort from '@/components/FilterAndSort';
import Pagination from '@/components/Pagination';
import PokemonList from '@/components/PokemonList';
import PokemonForm from '@/components/PokemonForm';
import { usePokemonUI } from '@/lib/PokemonUtils/pokeUiPlusMassactions';
import { usePokemonActions } from '@/lib/PokemonUtils/pokeActions';
import { usePokemonPagination } from '@/lib/PokemonUtils/pokePagination';
import { usePokemonFilterAndSort } from '@/lib/PokemonUtils/pokeFilterAndSort';
import { Pokemon } from '@/lib/types';


const PokemonsPage = () => {
  const {
    pokemons,
    selectedDetail,
    newPokemon,
    updatingPokemon,
    handleDetailsClick,
    handleDeleteClick,
    handleSubmitClick,
    handleUpdateSubmit,
    handleUpdateInputChange,
    handleUpdateClick,
    handleInputChange,
  } = usePokemonActions();

  const {
    showForm, 
    handleCreateClick,
    showDropdown,
    setShowDropdown,
    selectedPokemons, 
    handleCheckboxChange,
    handleBulkDeleteClick,
    selectedCharacteristic,
    setSelectedCharacteristic,
    handleMassUpdateSubmit,
    massUpdateValue,
    setMassUpdateValue,
    handleMassUpdateInputChange,
    handleMassInputChange,
    setShowForm,
    handleInputTempChange, 
    pokemonInputs,
    handleMassUpdateClick,
  } = usePokemonUI();

  const {
    sortType, 
    filterType, 
    filterValue, 
    handleSortChange, 
    handleFilterTypeChange, 
    handleFilterValueChange, 
    sortedAndFilteredPokemons,
    handleSortDirectionChange,
    sortOrder,
  } = usePokemonFilterAndSort(pokemons);

  const { currentPage, 
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    previousPage,
   handleChange,
   handleItemsPerChange,pageNumbers } = usePokemonPagination(Math.ceil(sortedAndFilteredPokemons.length / 5));

  return (
    <div className="space-y-4 bg-gray-300">
     <FilterAndSort 
  handleSortChange={handleSortChange} 
  handleFilterTypeChange={handleFilterTypeChange}
  handleFilterValueChange={handleFilterValueChange}
  handleSortDirectionChange={handleSortDirectionChange} // новый обработчик
  sortDirection={sortOrder} // новое свойство
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
        selectedPokemons={selectedPokemons} 
        handleCheckboxChange={handleCheckboxChange} 
        showDropdown = {showDropdown}
        setShowDropdown = {setShowDropdown}
        handleBulkDeleteClick = {handleBulkDeleteClick}
        selectedCharacteristic = {selectedCharacteristic}
       setSelectedCharacteristic = {setSelectedCharacteristic}
       handleMassUpdateSubmit = {handleMassUpdateSubmit }
       massUpdateValue = {massUpdateValue}
       setMassUpdateValue = {setMassUpdateValue}
       showForm={showForm}
        setShowForm={setShowForm}
       handleMassInputChange = {handleMassInputChange}
       handleMassUpdateInputChange={handleMassUpdateInputChange}
       handleInputTempChange = {handleInputTempChange}
       pokemonInputs = {pokemonInputs}
       handleMassUpdateClick = {handleMassUpdateClick }

      />
     <Pagination
  currentPage={currentPage}
  totalPages={Math.ceil(sortedAndFilteredPokemons.length / itemsPerPage)}
  nextPage={nextPage}
  previousPage={previousPage}
  handleChange={handleChange}
  handleItemsPerChange={handleItemsPerChange}
  itemsPerPage={itemsPerPage}
  pageNumbers={pageNumbers} // добавьте это
/>
      <PokemonForm
       handleSubmitClick={handleSubmitClick}
       handleInputChange={handleInputChange}
       handleCreateClick={handleCreateClick}
       newPokemon={newPokemon}
       showForm={showForm} 
      />
    </div>
  );
};

export default PokemonsPage;
