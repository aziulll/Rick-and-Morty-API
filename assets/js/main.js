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

var searchInput = document.getElementById('searchInput');
var searchButton = document.getElementById('searchButton');
var container = document.querySelector('.container');

searchButton.addEventListener('click', function () {
  var nome = searchInput.value.trim();
  
  if (nome.length > 0) {
    var url = `https://rickandmortyapi.com/api/character/?name=${nome}`;
    carregarLista(url);
  }
});

function carregarLista(url) {
  fetch(url, {
    method: 'GET'
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      container.innerHTML = '';

      json.results.forEach(function (item) {
        var card = document.createElement('div');
        card.className = 'card';
        card.style.width = '18rem';

        var img = document.createElement('img');
        img.src = item.image;
        img.className = 'card-img-top';

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = item.name;

        var gender = document.createElement('span');
        gender.textContent = 'Sexo: ' + item.gender;

        var status = document.createElement('span');
        status.textContent = 'Status: ' + item.status;

        cardBody.appendChild(title);
        cardBody.appendChild(gender);
        cardBody.appendChild(status);

        card.appendChild(img);
        card.appendChild(cardBody);

        container.appendChild(card);
      });
    });
}
