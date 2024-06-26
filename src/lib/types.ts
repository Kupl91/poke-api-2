// C:\Users\pavel.kuplensky\Documents\GitHub\poke-api-2\src\lib\types.ts

export interface Pokemon {
  id: number
  name: string
  weight: number
  height: number
  species: string
  experience: number
  abilities: { ability: { name: string } }[]
}

export interface PokemonDetail {
  id: number
  name: string
  weight: number
  height: number
  species: string
  experience: number
  abilities: { ability: { name: string } }[]
}

export const initialPokemonState = {
  id: -1,
  name: '',
  weight: -1,
  height: -1,
  species: '',
  experience: -1,
  abilities: [],
}

export interface InputTypes {
  [key: string]: string
  Имя: string
  Вес: string
  Высота: string
  Вид: string
  Опыт: string
}

export const inputTypes: InputTypes = {
  Имя: 'text',
  Вес: 'number',
  Высота: 'number',
  Вид: 'text',
  Опыт: 'number',
}

export interface IndexedPokemon {
  [key: string]: string | number | undefined // добавили этот индексный интерфейс
  name: string
  weight: number
  height: number
  species: string
  experience: number
}

export interface PokemonFormProps {
  handleSubmitClick: () => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleCreateClick: () => void
  showForm: boolean
  newPokemon: IndexedPokemon // обновили здесь
}

export interface PokemonListProps {
  pokemons: Pokemon[]
  handleDeleteClick: (id: number) => void
  handleDetailsClick: (id: number) => void
  handleUpdateSubmit: () => void
  handleUpdateClick: (id: number) => void
  handleUpdateInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  selectedDetail: Pokemon | null
  updatingPokemon: Pokemon | null
  currentPage: number
  itemsPerPage: number
  selectedPokemons: number[]
  handleCheckboxChange: (id: number) => void
  showDropdown: boolean
  setShowDropdown: (show: boolean) => void
  handleBulkDeleteClick: (ids: number[]) => void
  selectedCharacteristic: string | null
  setSelectedCharacteristic: (value: string | null) => void
  handleMassUpdateSubmit: () => void
  massUpdateValue: string | number
  setMassUpdateValue: React.Dispatch<React.SetStateAction<string | number>>
  handleMassUpdateInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  handleMassInputChange: (event: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => void
  pokemonInputs: { [key: number]: { [field: string]: string | number } }
  handleInputTempChange: (event: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => void
  handleSelectCharacteristic?: (characteristic: string | number) => void
  handleMassUpdateClick: (id: number | string) => void
}

export interface PokemonDropdownMenuProps {
  selectedPokemons: number[]
  pokemons: Pokemon[]
  handleMassUpdateClick: (id: number | string) => void
  setShowDropdown: (show: boolean) => void
  showDropdown: boolean
  handleBulkDeleteClick: (ids: number[]) => void
  handleMassUpdateSubmit: () => void
  massUpdateValue: string | number
  setMassUpdateValue: React.Dispatch<React.SetStateAction<string | number>>
  handleMassUpdateInputChange: (event: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => void
  handleMassInputChange: (event: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => void
  pokemonInputs: { [key: number]: { [field: string]: string | number } }
}

export interface FilterAndSortProps {
  handleSortChange: (value: keyof Pokemon) => void
  handleSortDirectionChange: () => void
  handleFilterTypeChange: (value: keyof Pokemon) => void
  handleFilterValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  sortDirection: 'asc' | 'desc'
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  nextPage(): void
  previousPage(): void
  handleChange(pageNumber: number): void
  handleItemsPerChange(event: any): void
  itemsPerPage: number
  pageNumbers: number[]
}
