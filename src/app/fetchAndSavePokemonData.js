import { PrismaClient } from '@prisma/client'
import fetch from 'node-fetch'

const prisma = new PrismaClient()

async function fetchPokemonData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=25')
    const data = await response.json()
    const pokemons = data.results

    const pokemonPromises = pokemons.map(async pokemon => {
      const pokemonResponse = await fetch(pokemon.url)
      const pokemonData = await pokemonResponse.json()

      if (pokemonData) {
        console.log(pokemonData.name) // Выводим имя покемона в консоль

        const existingPokemon = await prisma.pokemon.findFirst({
          where: { name: pokemonData.name },
        })

        if (!existingPokemon) {
          const pokemonRecord = await prisma.pokemon.create({
            data: {
              name: pokemonData.name,
              weight: pokemonData.weight,
              height: pokemonData.height,
              species: pokemonData.species.name,
              experience: pokemonData.base_experience,
            },
          })

          const abilitiesToCreate = []
          for (const ability of pokemonData.abilities) {
            const existingAbility = await prisma.ability.findFirst({
              where: { name: ability.ability.name },
            })

            if (!existingAbility) {
              abilitiesToCreate.push(ability.ability.name)
            }
          }

          if (abilitiesToCreate.length > 0) {
            const abilities = await prisma.ability.createMany({
              data: abilitiesToCreate.map(name => ({ name })),
            })

            for (const ability of abilities) {
              await prisma.pokemonAbility.create({
                data: {
                  pokemonId: pokemonRecord.id,
                  abilityId: ability.id,
                },
              })
            }
          }

          console.log(`Успешно добавлен покемон ${pokemonData.name} и его способности.`)
        } else {
          console.log(`Покемон ${pokemonData.name} уже существует в базе данных.`)
        }
      }
    })

    await Promise.all(pokemonPromises)
    console.log('Все операции успешно завершены.')
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

fetchPokemonData()
