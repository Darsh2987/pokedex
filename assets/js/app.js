window.addEventListener("load", () => {
  let startNum = 1;
  let endNum = 151;

  document.querySelector("#second-gen-btn").addEventListener("click", () => {
    startNum = 152;
    endNum = 251;
  });

  console.log(startNum, endNum);

  const fetchPokemons = async () => {
    for (let i = startNum; i <= endNum; i++) {
      await fetchData(i);
    }
  };

  async function fetchData(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      createPokemon(data);
    } catch (e) {
      console.log("There was a problem fetching the pokemon data");
    }
  }

  function createPokemon(pokemon) {
    const pokemonGrid = document.querySelector("#pokemon-grid");
    const pokemonCardEl = document.createElement("div");
    pokemonCardEl.classList.add("pokemon-card");
    pokemonCardEl.classList.add(`pokemon-card-type-${pokemon.types[0].type.name}`);

    const pokemonCard = `
        <div class="pokemon-card-img"><img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"></div>
        <div class="pokemon-card-name">${pokemon.name}</div>
        <div class="pokemon-card-type"> 
          <ul>Type: ${pokemon.types
            .map((el) => {
              return `<li class="pokemon-type pokemon-type-${el.type.name}">${el.type.name}</li>`;
            })
            .join(", ")}
          </ul>
        </div>
        <div class="pokemon-card-height-and-weight">
          <ul>
            <li class="pokemon-weight">weight: ${pokemon.weight / 10}kg</li>
            <li class="pokemon-height">height: ${pokemon.height / 10}m</li>
          </ul>
        </div>
        <div class="pokemon-card-number">#${pokemon.id}</div>
    `;

    pokemonCardEl.innerHTML = pokemonCard;
    pokemonGrid.appendChild(pokemonCardEl);
  }

  fetchPokemons();
});
