import React, { useCallback, useEffect } from "react";
import MainContext from "./Contexts/MainContext/MainContext";
import GameContext from "./Contexts/GameContext/GameContext";
import BasicPokemonCard from "./Components/Molecules/BasicPokemonCard/BasicPokemonCard";
import BasicDeck from "./Components/Molecules/BasicDeck/Deck";
import ToastContainer from "./Components/Molecules/ToastContainer/ToastContainer";
import MotionContext from "./Contexts/MotionContext/MotionContext";

import MySvg from './Assets/Svg/Vector4.svg';

function DevScreen() {
  const { fetchPokemonData, pokemonDataList } = React.useContext(MainContext);
  const { buildDecks, playerDeck, botDeck } = React.useContext(GameContext);
  const { startAnimation } = React.useContext(MotionContext);

  const LogData = useCallback((): void => {
    console.log('Dados carregados:', pokemonDataList);
    console.log('Deck Player:', playerDeck);
    console.log('Deck Bot:', botDeck);
  }, [pokemonDataList, playerDeck, botDeck]);

  return (
    <>
      <ToastContainer />
      <button onClick={fetchPokemonData}>Carregar Dados</button>
      <button onClick={LogData}>Logar Dados</button>
      <button onClick={buildDecks}>Build Decks</button>
      <button onClick={startAnimation}>Animar</button>


      {!!playerDeck.length && (
        <>
          <h4>Game Decks:</h4>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div>
              <h2>Player Deck:</h2>

              <BasicDeck>
                {
                  playerDeck.map((pokemonData) => (
                    <BasicPokemonCard
                      key={pokemonData.id}
                      data={pokemonData}
                    />
                  ))
                }
              </BasicDeck>
            </div>

            <div>
              <h2>Bot Deck:</h2>
              
              <BasicDeck>
                {
                  botDeck.map((pokemonData) => (
                    <BasicPokemonCard
                      key={pokemonData.id}
                      data={pokemonData}
                    />
                  ))
                }
              </BasicDeck>
            </div>
              
          </div>
        </>
      )}

      <MySvg />
    </>
  );
}

export default DevScreen;
