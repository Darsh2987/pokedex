window.addEventListener("load", () => {
  const pokemonGrid = document.querySelector("#pokemon-grid");

  let startNum = 1;
  let endNum = 151;

  // fetchPokemons async function with a loop - when called the loop will pass a number to the fecthData function which is used for the fecth url end point
  const fetchPokemons = async () => {
    for (let i = startNum; i <= endNum; i++) {
      await fetchData(i);
    }

    revealPokemonCards();
  };

  // fetchData function - gets the data from the poke api, the loop from the "fetchPokemons" function will pass in the number for the fecth url end point
  async function fetchData(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      createPokemon(data);
    } catch (e) {
      console.log("There was a problem fetching the pokemon data");
    }
  }

  // create pokemon function - once the data has been fetched from the api, this function will create the HTML using the data
  function createPokemon(pokemon) {
    const pokemonCardEl = document.createElement("div");
    pokemonCardEl.classList.add("pokemon-card", `pokemon-card-type-${pokemon.types[0].type.name}`);

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

  // funtion to clear pokemon-grid, used for the generation click event
  function clearPokemonGrid() {
    pokemonGrid.innerHTML = "";
    fetchPokemons();
  }

  // click events for the 1st generation button
  document.querySelector("#first-gen-btn").addEventListener("click", () => {
    startNum = 1;
    endNum = 151;
    clearPokemonGrid();
  });

  // click events for the 2nd generation button
  document.querySelector("#second-gen-btn").addEventListener("click", () => {
    startNum = 152;
    endNum = 251;
    clearPokemonGrid();
  });

  // click events for the 3nd generation button
  document.querySelector("#third-gen-btn").addEventListener("click", () => {
    startNum = 252;
    endNum = 386;
    clearPokemonGrid();
  });

  // function to reveal pokemoncards on load and on scroll event
  function revealPokemonCards() {
    let revealPokemonCards = document.querySelectorAll(".pokemon-card");

    function reveal() {
      revealPokemonCards.forEach((el) => {
        let scrollPercent = (el.getBoundingClientRect().y / window.innerHeight) * 100;
        if (scrollPercent < 75) {
          el.classList.add("reveal-pokemon-card");
        }
      });
    }
    reveal();

    window.addEventListener("scroll", () => {
      reveal();
    });
  }

  document.querySelector(".go-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  fetchPokemons();
});
