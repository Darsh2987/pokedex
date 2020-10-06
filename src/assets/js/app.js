import "../styles/scss/imports.scss";
window.addEventListener("load", () => {
  const pokemonGrid = document.querySelector("#pokemon-grid");

  let startNum = 1;
  let endNum = 151;

  /**
   * @description - The job of the intersection observer is to tell us when elements have come above the fold.
   * Only load the data and render it when it's in view
   */
  const observer = new IntersectionObserver(async (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && entry.target.dataset.loaded !== true) {
        // We know the ID of the element which is now in view
        const id = entry.target.dataset.id;
        // Grab data from API first using the ID
        const pokeData = await fetchData(id);
        entry.target.classList.add("visible", `pokemon-card-type-${pokeData.types[0].type.name}`);
        entry.target.innerHTML = fillPokemonData(pokeData);
        entry.target.dataset.loaded = true;
      }
    });
  });

  /**
   *
   * @param {object} pokemon
   * @description - Generate html for the pokemon object recieved
   */
  const fillPokemonData = (pokemon) => {
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
  };

  /**
   * @description - This fetches data from the API and returns the object
   * @param {number} id - The ID of the Pokemon to fetch from the API
   * @returns {Promise<object>}
   */
  async function fetchData(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return await response.json();
    } catch (e) {
      console.error("There was a problem fetching the pokemon data");
    }
  }

  /**
   * @description - Create a wrapper for the pokemon content
   * @param {number} id - The ID of the pokemon reference
   * @returns {void}
   */
  function createPokemon(id) {
    const pokemonCardEl = document.createElement("div");
    // Set data attribute to keep track of ID for this element
    pokemonCardEl.dataset.id = id;
    pokemonCardEl.classList.add("pokemon-card");

    observer.observe(pokemonCardEl);
    pokemonGrid.appendChild(pokemonCardEl);
  }

  // funtion to clear pokemon-grid, used for the generation click event
  function clearPokemonGrid() {
    pokemonGrid.innerHTML = "";
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
    for (let i = startNum; i <= endNum; i++) {
      // Create skeleton DOM Element to hold our pokement that hasn't loaded yet
      createPokemon(i);
    }
  }

  document.querySelector(".go-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initiate script
  init();
});
