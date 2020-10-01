import "../styles/css/styles.css";
window.addEventListener("load", () => {
  const pokemonGrid = document.querySelector("#pokemon-grid");
  let pokemonList = [];

  let startNum = 1;
  let endNum = 151;

  // Create observer to watch element pass the fold
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const id = entry.target.dataset.id;
        entry.target.innerHTML = fillPokemonData(id);
      }
    });
  });

  const fillPokemonData = (id) => {
    // Grab pokemon object from our list indexed by ID
    let pokemon = pokemonList[id];

    return `
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
  }

  // fetchPokemons async function with a loop - when called the loop will pass a number to the fecthData function which is used for the fecth url end point
  const fetchPokemons = async () => {
    for (let i = startNum; i <= endNum; i++) {
      const pokemonObj = await fetchData(i);
      pokemonList[i] = pokemonObj;
    }

    return pokemonList
  };

  // fetchData function - gets the data from the poke api, the loop from the "fetchPokemons" function will pass in the number for the fecth url end point
  async function fetchData(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return await response.json();
    } catch (e) {
      console.log("There was a problem fetching the pokemon data");
    }
  }

  // create pokemon function - once the data has been fetched from the api, this function will create the HTML using the data
  function createPokemon(pokemon) {
    const pokemonCardEl = document.createElement("div");
    // Set data attribute to keep track of ID for this element
    pokemonCardEl.dataset.id = pokemon.id;
    pokemonCardEl.classList.add("pokemon-card", `pokemon-card-type-${pokemon.types[0].type.name}`);

    observer.observe(pokemonCardEl);
    pokemonGrid.appendChild(pokemonCardEl);
  }

  // funtion to clear pokemon-grid, used for the generation click event
  function clearPokemonGrid() {
    pokemonGrid.innerHTML = "";
    pokemonList = [];
  }

  // click events for the 1st generation button
  document.querySelector("#first-gen-btn").addEventListener("click", () => {
    startNum = 1;
    endNum = 151;
    clearPokemonGrid();
    init();
  });

  // click events for the 2nd generation button
  document.querySelector("#second-gen-btn").addEventListener("click", () => {
    startNum = 152;
    endNum = 251;
    clearPokemonGrid();
    init();
  });

  // click events for the 3nd generation button
  document.querySelector("#third-gen-btn").addEventListener("click", () => {
    startNum = 252;
    endNum = 386;
    clearPokemonGrid();
    init();
  });

  async function init() {
    const pokeList = await fetchPokemons();
    pokeList.forEach((v, i) => {
      createPokemon(v);
    });
  }

  document.querySelector(".go-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initiate script
  init();

});
