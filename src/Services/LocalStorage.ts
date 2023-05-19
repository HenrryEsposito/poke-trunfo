import { IPokemonData } from "../Contexts/MainContext/types";

export function getItem(key: string, initialValue: any) {
  const jsonValue = localStorage.getItem(key);
  if (jsonValue != null) return JSON.parse(jsonValue);
  return initialValue;
}

export function setItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadPokemonDataList(): IPokemonData[] {
  const pokemonDataList: IPokemonData[] = [];
  const keys = Object.keys(localStorage);

  keys.forEach((key) => {
    if (key.startsWith("pokemonDataList")) {
      pokemonDataList.push(...getItem(key, []));
    }
  });

  return pokemonDataList;
}

export function savePokemonDataList(pokemonDataList: IPokemonData[]) {
  const MAX_ITEMS = 10;

  let currentItemList: IPokemonData[] = [];

  pokemonDataList.forEach((pokemonData, index) => {
    currentItemList.push(pokemonData);

    if ((index + 1) % MAX_ITEMS === 0 || index === pokemonDataList.length - 1) {
      const key = `pokemonDataList${Math.floor(index / MAX_ITEMS)}`;
      localStorage.setItem(key, JSON.stringify(currentItemList));
      currentItemList = [];
    }
  });
}
