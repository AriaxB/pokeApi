import React, { useEffect, useState } from "react";
import '../styles/index.css'
const Peticion = () => {
  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    //funcion que consume la api
    async function GetData(){
      const link = "https://pokeapi.co/api/v2/pokemon?limit=10";
      const response = await fetch(link);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      const urls = data.results.map((result) => result.url);

    //bloque que trae los detalles de los 10 primeros pokemones
      try {
        const detailPromises = urls.map(async (url) => {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          return await response.json();
        });

        const results = await Promise.all(detailPromises);
        //arreglo con los detalles de cada pokemon
        setPokemones(results);
      } catch (error) {
        console.log("Error al obtener detalles de los Pokémon:", error);
      }
    };

    GetData();
  }, []);

  console.log(pokemones);

  return (
    <>
      {pokemones.map((element, index) => (
        <div key={index} className="cart-style">
            <h1>order: {element.order}</h1>
          <h1>{element.name}</h1>
          <img src={element.sprites.back_default} alt={element.name} />
          <p>Height: {element.height}</p>
          <p>Weight: {element.weight}</p>
          <h1>types</h1>
          <div className="cart-types">
            {element.types.map((el,index)=>{
                return(
                <p key={index}>{el.type.name}</p>
                )
            })}
          </div>
          <h1>Habilities</h1>
          <div className="cart-habilities">
            {element.abilities.map((el,index)=>{
                return(
                <p key={index}>{el.ability.name}</p>
                )
            })}
          </div>
        </div>
      ))}
    </>
  );

};

export default Peticion;
