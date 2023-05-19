import React, { useRef, useState, useEffect } from "react";
import MainContext from "./MainContext";
import { IMainContextData, IPokemonData } from "./types";
import { getPokemons } from "../../Services/PokeApi";
import {
  getItem,
  loadPokemonDataList,
  savePokemonDataList,
  setItem,
} from "../../Services/LocalStorage";

interface IMainProviderProps {
  children: React.ReactNode;
}

const MainProvider: React.FC<IMainProviderProps> = ({ children }) => {
  function generateNewPokemonIds(existingIds: number[]): number[] {
    const minId = 1;
    const maxId = 150;
    const totalNewIds = Math.floor((maxId - minId + 1) * 0.05);

    const possibleIds = Array.from({ length: maxId }, (_, i) => i + 1);

    const remainingIds = possibleIds.filter((id) => !existingIds.includes(id));

    for (let i = remainingIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingIds[i], remainingIds[j]] = [remainingIds[j], remainingIds[i]];
    }

    return remainingIds.slice(0, totalNewIds);
  }

  async function populatePokemonDataList(
    loadedDataList: IPokemonData[]
  ): Promise<IPokemonData[]> {
    try {
      const loadedIds = loadedDataList.map((pokemon) => pokemon.id);

      const newIds = generateNewPokemonIds(loadedIds);

      const newPokemonDataList = await getPokemons(newIds);

      return [...loadedDataList, ...newPokemonDataList];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function loadPokemonData() {
    try {
      const loadedDataList: IPokemonData[] = loadPokemonDataList();
      const lastTimeLoadedIsoTime = getItem("lastTimeLoaded", "");

      const alreadyLoaded =
        loadedDataList.length > 0 && lastTimeLoadedIsoTime !== "";
      let shouldLoadNewData = true;

      if (alreadyLoaded) {
        const lastTimeLoaded = new Date(lastTimeLoadedIsoTime);
        shouldLoadNewData =
          Date.now() - lastTimeLoaded.getTime() > 1000 * 60 * 5;
      }

      if (shouldLoadNewData) {
        const populatedPokemonDataList = await populatePokemonDataList(
          loadedDataList
        );

        savePokemonDataList(populatedPokemonDataList);
        setItem("lastTimeLoaded", new Date().toISOString());
        
        return populatedPokemonDataList;
      } else {
        return loadedDataList;
      }
    } catch (error) {
      console.error("Error populating pokemon data list:", error);
      return [];
    }
  }

  const [pokemonDataList, setPokemonDataList] = useState<IPokemonData[]>([]);

  async function fetchPokemonData() {
    const data = await loadPokemonData();


    setPokemonDataList(data);
  }

  const providedData: IMainContextData = {
    fetchPokemonData,
    pokemonDataList,
  };

  return (
    <MainContext.Provider value={providedData}>{children}</MainContext.Provider>
  );
};

export default MainProvider;
