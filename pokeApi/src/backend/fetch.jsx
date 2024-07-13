import React, { useEffect, useState } from "react";
import '../styles/index.css';

function eventos(clase) {
  const elementos = document.getElementsByClassName(clase);
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].classList.toggle('hover-true');
  }
}

const Peticion = () => {
  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    async function GetData() {
      const link = "https://pokeapi.co/api/v2/pokemon?limit=10";
      const response = await fetch(link);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      const urls = data.results.map((result) => result.url);

      // Block to fetch details of the first 10 Pokémon
      try {
        const detailPromises = urls.map(async (url) => {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          return await response.json();
        });

        const results = await Promise.all(detailPromises);
        // Array with details of each Pokémon
        setPokemones(results);
      } catch (error) {
        console.log("Error al obtener detalles de los Pokémon:", error);
      }
    }

    GetData();
  }, []);

  console.log(pokemones);

  // Render Pokémon cards
  return (
    <>
      {pokemones.map((element, index) => (
        <div key={index} className="cart-style" onClick={()=>eventos("arrays-container")}>
          <h1>Order: {element.order}</h1>
          <h1>{element.name}</h1>
          <img src={element.sprites.back_default} alt={element.name} />
          <p>Height: {element.height}</p>
          <p>Weight: {element.weight}</p>
          <div className="arrays-container">
            <h1>Types</h1>
            <div className="cart-types">
              {element.types.map((el, index) => (
                <p key={index}>{el.type.name}</p>
              ))}
            </div>
            <h1>Abilities</h1>
            <div className="cart-abilities">
              {element.abilities.map((el, index) => (
                <p key={index}>{el.ability.name}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Peticion;
