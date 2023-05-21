import React, { useCallback } from "react";
import MainContext from "./Contexts/MainContext/MainContext";
import GameContext from "./Contexts/GameContext/GameContext";
import BasicPokemonCard from "./Components/Molecules/BasicPokemonCard";

function DevScreen() {
  const { fetchPokemonData, pokemonDataList } = React.useContext(MainContext);
  const { buildDecks, playerDeck, botDeck } = React.useContext(GameContext);

  const LogData = useCallback((): void => {
    console.log('Dados carregados:', pokemonDataList);
    console.log('Deck Player:', playerDeck);
    console.log('Deck Bot:', botDeck);
  }, [pokemonDataList, playerDeck, botDeck]);

  return (
    <>
      <button onClick={fetchPokemonData}>Carregar Dados</button>
      <button onClick={LogData}>Logar Dados</button>
      <button onClick={buildDecks}>Build Decks</button>
      {/* {pokemonDataList.length === 0 && <p>Vazio...</p>}
      {pokemonDataList.length > 0 && (
        <div>
          {pokemonDataList.map((pokemonData) => (
            <div key={pokemonData.id}>
              <p key={pokemonData.id}>{pokemonData.name}</p>
              <img
                src={pokemonData.sprites.front_default || ""}
                alt={pokemonData.name}
              />
            </div>
          ))}
        </div>
      )} */}

      {!!playerDeck.length && (
        <>
          <h4>Game Decks:</h4>
          {''}
          <h2>Player Deck:</h2>
          {
            playerDeck.map((pokemonData) => (
              <BasicPokemonCard
                key={pokemonData.id}
                data={pokemonData}
              />
            ))
          }
          {''}
          <h2>Bot Deck:</h2>
          {
            botDeck.map((pokemonData) => (
              <BasicPokemonCard
                key={pokemonData.id}
                data={pokemonData}
              />
            ))
          }
        </>
      )}
    </>
  );
}

export default DevScreen;
