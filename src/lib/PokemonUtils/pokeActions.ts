// C:\Users\Pavel\poke-api-2\src\lib\PokemonUtils\pokeActions.ts
import { useState, useEffect } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Pokemon, PokemonDetail, initialPokemonState } from '@/lib/types'

export const usePokemonActions = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [selectedDetail, setSelectedDetail] = useState<PokemonDetail | null>(null)
  const [updateFormOpen, setUpdateFormOpen] = useState(false)
  const [newPokemon, setNewPokemon] = useState({
    name: '',
    weight: 0,
    height: 0,
    species: '',
    experience: 0,
  })
  useEffect(() => {
    fetchPokemons()
  }, [])

  const fetchPokemons = async () => {
    try {
      const response = await fetch('/api/pokemons')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setPokemons(data)
    } catch (unknownError) {
      let errorMessage

      if (unknownError instanceof Error) {
        errorMessage = unknownError.message
      } else {
        errorMessage = String(unknownError)
      }

      console.error('Ошибка при загрузке покемонов:', errorMessage)
    }
  }

  const [updatingPokemon, setUpdatingPokemon] = useState<Pokemon | null>(initialPokemonState)

  const handleDetailsClick = async (id: number) => {
    if (selectedDetail && selectedDetail.id === id) {
      setSelectedDetail(null)
      return
    }

    try {
      const response = await fetch(`/api/pokemon/get?id=${id}`)

      if (!response.ok) {
        setSelectedDetail(null)
        alert('Покемон с таким ID не найден')
        return
      }

      const pokemonData = await response.json()

      const abilities = Array.isArray(pokemonData.abilities)
        ? pokemonData.abilities.map((pa: { ability?: { name?: string } }, index: number) => ({
            ability: {
              name: pa?.ability?.name || `Неизвестная способность ${index}`, // уникальные имена
            },
          }))
        : []

      const detail: PokemonDetail = {
        id: pokemonData.id,
        name: pokemonData.name,
        weight: pokemonData.weight,
        height: pokemonData.height,
        species: pokemonData.species,
        experience: pokemonData.experience,
        abilities,
      }

      setSelectedDetail(detail)
    } catch (error) {
      console.error('Ошибка при загрузке данных', error)
    }
  }

  const handleDeleteClick = async (id: number) => {
    try {
      const response = await fetch(`/api/pokemon/delete?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPokemons(pokemons.filter(pokemon => pokemon.id !== id))
      } else {
        throw new Error('Не удалось удалить покемона')
      }
    } catch (error) {
      console.error('Ошибка при удалении покемона:', error)
    }
  }

  const handleSubmitClick = async () => {
    try {
      const response = await fetch('/api/pokemon/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPokemon.name,
          weight: newPokemon.weight,
          height: newPokemon.height,
          species: newPokemon.species,
          experience: newPokemon.experience,
        }),
      })

      if (response.ok) {
        const pokemon = await response.json()
        setPokemons(prevPokemons => [...prevPokemons, pokemon])

        toast({
          title: 'Успех!',
          description: 'Покемон успешно заведен!',
          variant: 'default',
        })
      } else {
        console.log('Server Error ', response.status)
        throw new Error('Не удалось создать покемона')
      }
    } catch (err) {
      const error = err as Error

      console.error('Ошибка при создании покемона:', error.message)

      toast({
        title: 'Ошибка!',
        description: 'Такой покемон уже существует.',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateSubmit = async () => {
    if (!updatingPokemon) {
      console.error('Нет покемона для обновления')
      return
    }
    try {
      const response = await fetch('/api/pokemon/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updatingPokemon.id,
          name: updatingPokemon.name,
          weight: updatingPokemon.weight,
          height: updatingPokemon.height,
          species: updatingPokemon.species,
          experience: updatingPokemon.experience,
        }),
      })

      if (response.ok) {
        const updatedPokemon = await response.json()
        setPokemons(pokemons.map(pokemon => (pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon)))
        setUpdatingPokemon(null)

        toast({
          title: 'Успех!',
          description: 'Покемон успешно обновлен!',
          variant: 'default',
        })
      } else {
        throw new Error('Не удалось обновить покемона')
      }
    } catch (err) {
      const error = err as Error

      console.error('Ошибка при обновлении покемона:', error.message)

      toast({
        title: 'Ошибка!',
        description: 'Не удалось обновить покемона.',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatingPokemon(prev => ({
      ...prev!,
      [event.target.name]: event.target.value,
    }))
  }

  const handleUpdateClick = (id: number) => {
    if (updatingPokemon && updatingPokemon.id === id) {
      setUpdatingPokemon(null)
      setUpdateFormOpen(false)
    } else {
      const pokemonToUpdate = pokemons.find(pokemon => pokemon.id === id)
      setUpdatingPokemon(pokemonToUpdate ? { ...pokemonToUpdate } : null)
      setUpdateFormOpen(true)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPokemon({
      ...newPokemon,
      [event.target.name]: event.target.value,
    })
  }

  return {
    pokemons,
    selectedDetail,
    newPokemon,
    setNewPokemon,
    updatingPokemon,
    fetchPokemons,
    handleDetailsClick,
    handleDeleteClick,
    handleSubmitClick,
    handleUpdateSubmit,
    handleUpdateInputChange,
    handleUpdateClick,
    setPokemons,
    setUpdatingPokemon,
    updateFormOpen,
    handleInputChange,
  }
}
