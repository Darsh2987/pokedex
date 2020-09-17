const fetchPokemons = async () => {
  for (let i = 1; i <= 150; i++) {
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
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon-card");

  const pokemonCard = `
      <div class="pokemon-card-img"><img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" width="10%"></div>
      <div class="pokemon-card-name">${pokemon.name}</div>
      <div class="pokemon-card-type">Type: ${pokemon.types
        .map((el) => {
          return el.type.name;
        })
        .join(", ")}</div>
      <div class="pokemon-card-height-and-weight">
        <ul>
          <li>weight: ${pokemon.weight / 10}kg</li>
          <li>height: ${pokemon.height / 10}m</li>
        </ul>
      </div>
      <div class="pokemon-card-number">#${pokemon.id}</div>
  `;

  pokemonEl.innerHTML = pokemonCard;
  pokemonGrid.appendChild(pokemonEl);
}

fetchPokemons();
