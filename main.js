const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const menuImagem = document.getElementsByClassName("menuImagem");

const containerRight = document.querySelector('.containerRight');

const maxRecords = 151;
const limit = 10;
let offset = 0;

// Função para renderizar detalhes no menuImagem
function showPokemonDetailsInMenu(pokemon) {
  if (menuImagem.length > 0) {
    menuImagem[0].innerHTML = `
          <li class= "pokemon ${pokemon.types[0]}" data-number="${pokemon.number}" data-name="${pokemon.name}" data-photo="${pokemon.photo}" data-types='${JSON.stringify(
          pokemon.types
        )}'>
              <div class="detail">
               <span class="number">#${pokemon.number}</span>
               <span class="name">${pokemon.name}</span>
            <img src=${pokemon.photo} alt=${pokemon.name}>
              <ol class="types">
                ${pokemon.types
                  .map(
                    (type) => `<li class="type ${type}">${type}</li>`
                  )
                  .join("")}
              </ol>
              <p>Abilities:</p>
              <ol class="abilities">
                ${pokemon.abilities
                  .map(
                    (ability) => `<li class="ability ${ability}
                    ">${ability}</li>`
                  )
                  .join("")}
              </ol> 
              <button id="close">Fechar</button> 
            </div>
          </li>
        `;
  }
}

function loadPokemonsItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
     const newHtml = pokemons
      .map(
        (pokemon) => `
          <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}" data-name="${pokemon.name}" data-photo="${pokemon.photo}" data-types='${JSON.stringify(pokemon.types)}' data-abilities='${JSON.stringify(pokemon.abilities)}'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types
                  .map(
                    (type) => `<li class="type ${type}">${type}</li>`
                  )
                  .join("")}
              </ol>
              <img src=${pokemon.photo} alt=${pokemon.name}>
            </div>
          </li>
        `
      )
      .join("");
    pokemonList.innerHTML += newHtml;

    // Adicionando o evento de clique nas cartas
    const pokemonCards = document.querySelectorAll(".pokemon");
    pokemonCards.forEach((card) => {
      card.addEventListener("click", () => {
        const pokemonData = {
          number: card.getAttribute("data-number"),
          name: card.getAttribute("data-name"),
          photo: card.getAttribute("data-photo"),
          types: JSON.parse(card.getAttribute("data-types")),
          abilities: JSON.parse(card.getAttribute("data-abilities")),
        };
        showPokemonDetailsInMenu(pokemonData);

        // Adiciona a classe "active" ao containerRight
        containerRight.classList.add('active');

        //excluir o active ao clicar no botao
        document.getElementById('close').addEventListener('click', () => {
          containerRight.classList.remove('active');
      });
      
        });
      });
    });
  };



loadPokemonsItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonsItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonsItens(offset, limit);
  }
});





