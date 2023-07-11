const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#searchInput');
var container = document.querySelector('.container');

fetch("https://rickandmortyapi.com/api/character", {
    method: 'GET'
})
    .then(response => response.json())
    .then(function (json) {

        var container = document.querySelector('.container')
      
        json.results.map(results => {
            container.innerHTML += `
         <div class="card" style="width: 18rem;">
          <img src= ` + results.image + ` class="card-img-top">
          <div class="card-body">
          <h5 class="card-title"> ` + results.name + `</h5>
          <span> Sexo: ` + results.gender + ` </span></br>
          <span> Status: ` + results.status + ` </span>

        `
        })
    
    })

    let nextPage = 1; // Próxima página a ser carregada
    let currentQuery = ''; // Termo de busca atual

    function searchCharacters(query, page = 1) {
        fetch(`https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`)
          .then(response => response.json())
          .then(data => {
            // Processa os dados retornados da API
            const results = data.results;
            // Limpa os resultados anteriores se for a primeira página
            if (page === 1) {
              const resultsSection = document.querySelector('#results');
              resultsSection.innerHTML = '';
            }
      
            if (results.length === 0) {
              // Se não houver resultados, exibe uma mensagem
              const resultsSection = document.querySelector('#results');
              resultsSection.innerHTML = 'Nenhum personagem encontrado.';
            } else {
              // Caso contrário, itera sobre os resultados e os exibe na página
              results.forEach(character => {
                const characterName = character.name;
                const characterImage = character.image;
                const characterGender = character.gender;
                const characterStatus = character.status;
      
                // Cria os elementos da card
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.style.width = '18rem';
      
                const imageElement = document.createElement('img');
                imageElement.src = characterImage;
                imageElement.classList.add('card-img-top');
      
                const cardBodyElement = document.createElement('div');
                cardBodyElement.classList.add('card-body');
      
                const nameElement = document.createElement('h5');
                nameElement.classList.add('card-title');
                nameElement.textContent = characterName;
      
                const genderElement = document.createElement('span');
                genderElement.textContent = `Sexo: ${characterGender}`;
      
                const statusElement = document.createElement('span');
                statusElement.textContent = `Status: ${characterStatus}`;
      
                // Adiciona os elementos à card e à seção de resultados
                cardBodyElement.appendChild(nameElement);
                cardBodyElement.appendChild(genderElement);
                cardBodyElement.appendChild(statusElement);
      
                cardElement.appendChild(imageElement);
                cardElement.appendChild(cardBodyElement);
      
                const resultsSection = document.querySelector('#results');
                resultsSection.appendChild(cardElement);
              });
            }
      
            // Atualiza a próxima página e o termo de busca atual
            nextPage = data.info.next ? new URL(data.info.next).searchParams.get('page') : null;
            currentQuery = query;
            updateLoadMoreButton();
          })
          .catch(error => {
            console.log('Ocorreu um erro:', error);
          });
      }
      
      // Função para atualizar o estado do botão "Carregar Mais"
      function updateLoadMoreButton() {
        const loadMoreButton = document.querySelector('#loadMoreButton');
        loadMoreButton.disabled = nextPage === null;
      }
      
      // Evento de envio do formulário
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value;
        searchCharacters(searchTerm);
      });
      
      // Evento de clique no botão "Carregar Mais"
      const loadMoreButton = document.querySelector('#loadMoreButton');
      loadMoreButton.addEventListener('click', function() {
        searchCharacters(currentQuery, nextPage);
      });
    