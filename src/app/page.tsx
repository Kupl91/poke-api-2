// C:\Users\Pavel\poke-api-2\src\app\page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"; 

const DetailPage = ({ pokeName }) => {
  return <div>{pokeName}</div>;
};

<<<<<<< Updated upstream
const PageCounter = ({ currentPage, totalPages }) => {
  return (
    <div>
      Страница {currentPage} из {totalPages}.
=======
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
  } = usePokemonActions();

  const {
    showForm, 
    handleCreateClick,
    handleInputChange,
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
  handleSortDirectionChange={handleSortDirectionChange} 
  sortDirection={sortOrder} 
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
>>>>>>> Stashed changes
    </div>
  );
};

const Page = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [sortType, setSortType] = useState('id');
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    async function getAllPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
      const data = await response.json();
      const pokemonsData = await Promise.all(data.results.map(async (pokemon, index) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        return { 
          id: index + 1,
          name: pokemon.name, 
          url: pokemon.url,
          height: pokemonData.height
        };
      }));

      setPokemons(pokemonsData);
      setTotalPages(Math.ceil(pokemonsData.length / itemsPerPage));
    }

    getAllPokemon();
  }, []);

  const [sortedPokemons, setSortedPokemons] = useState([]);

useEffect(() => {
  sortPokemons();
}, [pokemons, sortType]);

const sortPokemons = () => {
  let sorted;
  switch(sortType) {
    case 'id' :
      sorted = [...pokemons].sort((a , b) => a.id - b.id);
      break;
    case 'name' :
      sorted = [...pokemons].sort((a , b) => a.name.localeCompare(b.name));
      break;
    case 'height':
      sorted = [...pokemons].sort((a , b) => a.height - b.height);
      break;
      default:
        sorted = pokemons;
  }
  setSortedPokemons(sorted);
}

  const handleDetailsClick = async (url) => {
    setSelectedDetail(null);
    try {
      const response = await fetch(url);
      if(response.ok){
        const pokemonData = await response.json();
        
        setSelectedDetail({
          name: pokemonData.name,
          abilities: pokemonData.abilities.map(a => a.ability.name).join(', '),
          experience: pokemonData.base_experience,
          height: pokemonData.height
        });
      } else {
         throw new Error('Не удалось получить информацию о покемоне');
       }
      
    } catch (error) {
       console.error("Ошибка при загрузке данных:", error);
     }
   };

   const nextPage = () => {
     if (currentPage < totalPages) {
       setCurrentPage(currentPage + 1);
     }
   };
   
   const previousPage = () => {
     if (currentPage > 1) {
       setCurrentPage(currentPage - 1);
     }
   };
   
   const handleSortChange = (event) => {
    setSortType(event.target.value);
   };

   const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
   };

   const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value.toLowerCase()); 
   };

  return (
    <div>
      <input type="text" onChange={handleFilterValueChange} placeholder="Фильтр..." /> 
      <select onChange={handleFilterTypeChange}>
        <option value="name">Имя</option>
        <option value="id">ID</option>
        <option value="height">Высота</option>
      </select>
      <select onChange={handleSortChange}>
        <option value="id">ID</option>
        <option value="name">Имя</option>
        <option value="height">Высота</option>
      </select>
      {pokemons
        .filter((pokemon) => pokemon[filterType].toString().toLowerCase().includes(filterValue)) 
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map(({ id, name, url }) => (
          <div key={id} style={{ marginBottom:'10px' }}>
            <span>{name}</span>
            <Button  onClick={() => handleDetailsClick(url)}>Детали</Button> 
            
            <Link href={`/${name}`} legacyBehavior>
              <a target="_blank" style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Подробно</a>
             </Link>

             {selectedDetail && selectedDetail.name === name && 
               (<span style={{ marginLeft:"20px" }}>{`Имя:${selectedDetail.name}, Способности:${selectedDetail.abilities}, Опыт:${selectedDetail.experience}, Высота:${selectedDetail.height}`}</span>)
             }
          </div>
        ))}
        <Button onClick={previousPage}>Предыдущая</Button> 
      <Button onClick={nextPage}>Следующая</Button>
      <PageCounter currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default Page;