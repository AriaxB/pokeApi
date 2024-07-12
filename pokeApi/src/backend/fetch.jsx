import React, { useEffect, useState } from "react";

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
        <div key={index}>
          <h1>{element.name}</h1>
          <p>Height: {element.height}</p>
          <p>Weight: {element.weight}</p>
        </div>
      ))}
    </>
  );

};

export default Peticion;
