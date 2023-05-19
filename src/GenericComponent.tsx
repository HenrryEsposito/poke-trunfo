import React from "react";
import MainContext from "./Contexts/MainContext/MainContext";

function GenericComponent() {
  const { fetchPokemonData, pokemonDataList } = React.useContext(MainContext);

  return (
    <>
      <button onClick={fetchPokemonData}>Carregar Dados</button>

      {pokemonDataList.length === 0 && <p>Vazio...</p>}

      {pokemonDataList.length > 0 && (
        <div>
          {pokemonDataList.map((pokemonData) => (
            <div key={pokemonData.id}>
              <p key={pokemonData.id}>{pokemonData.name}</p>
              <img src={pokemonData.sprites.front_default || ''} alt={pokemonData.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default GenericComponent;
