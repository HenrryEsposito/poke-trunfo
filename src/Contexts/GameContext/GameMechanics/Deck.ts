import { IPokemonData } from "../../MainContext/types";

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let temporaryValue: T;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const DECK_SIZE = 10;

export function createDecks(
  pokemons: IPokemonData[]
): [IPokemonData[], IPokemonData[]] {
  if (pokemons.length < 2 * DECK_SIZE) {
    throw new Error(
      `Not enough Pokemon. Need at least ${2 * DECK_SIZE}, but got ${
        pokemons.length
      }.`
    );
  }

  const shuffledPokemons = shuffleArray(pokemons);
  const deck1 = shuffledPokemons.slice(0, DECK_SIZE);
  const deck2 = shuffledPokemons.slice(DECK_SIZE, 2 * DECK_SIZE);

  return [deck1, deck2];
}
