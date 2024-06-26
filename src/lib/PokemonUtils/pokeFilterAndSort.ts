import { useState } from 'react'
import { Pokemon } from '@/lib/types'

export const usePokemonFilterAndSort = (pokemons: Pokemon[]) => {
  const [sortType, setSortType] = useState<keyof Pokemon>('id')
  const [filterType, setFilterType] = useState<keyof Pokemon>('name')
  const [filterValue, setFilterValue] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSortChange = (value: keyof Pokemon) => {
    setSortType(value)
    // При изменении типа сортировки меняем порядок на противоположный
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleFilterTypeChange = (value: keyof Pokemon) => {
    setFilterType(value)
  }

  const handleFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value.toLowerCase())
  }

  const handleSortDirectionChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return {
    sortType,
    filterType,
    filterValue,
    sortOrder,
    handleSortChange,
    handleFilterTypeChange,
    handleFilterValueChange,
    handleSortDirectionChange,
    sortedAndFilteredPokemons: pokemons
      .filter(pokemon => (pokemon[filterType] as string | number)?.toString().toLowerCase().includes(filterValue))
      .sort((a, b) => {
        let comparison = 0
        if (typeof a[sortType] === 'string' && typeof b[sortType] === 'string') {
          comparison = (a[sortType] as string).localeCompare(b[sortType] as string)
        } else if (typeof a[sortType] === 'number' && typeof b[sortType] === 'number') {
          comparison = (a[sortType] as number) - (b[sortType] as number)
        }
        // Если порядок сортировки 'desc', меняем знак сравнения
        return sortOrder === 'desc' ? -comparison : comparison
      }),
  }
}
