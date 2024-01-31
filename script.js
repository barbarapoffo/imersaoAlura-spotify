const resultArtist = document.getElementById("result-artists");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

// FUNÇÃO PARA ESCONDER AS PLAYLISTS//
function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

// FUNÇÃO QUE IRÁ REQUISITAR A API // 
function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results));
}

// FUNÇÃO QUE IRÁ MOSTRAR NO DISPLAY O RESULTADO DA BUSCA, DEIXAR AS PLAYLISTS HIDDEN E MOSTRAR OS CARDS DOS ARTISTAS // 
function displayResults(results) {
  hidePlaylists();
  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  results.forEach((element) => {
    artistImage.src = element.urlImg;
    artistName.innerText = element.name;
  });
  resultArtist.classList.remove("hidden");
}

// AQ O EVENTO SERÁ DESENCADEADO, IRÁ BUSCAR O RESULTADO DO QUE FOI DIGITADO NO INPUT E CHAMAR AS OUTRAS FUNÇÕES; CASO SEJA VAZIO NAO MOSTRARÁ NADA, SE TIVER ALGO, VAI BUSCAR A FUNÇÃO SEARCHTERM, MOSTRANDO NO DISPLAY O RESULTADO COM A FUNÇÃO DISPLAYRESULTS// 
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});