'use strict';

const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const result = document.querySelector('.js-result');
const favList = document.querySelector('.js-result-fav');
const deleteItemsBtn = document.querySelector('.btn-delete');

let listSeries = [];
let favouritesList = [];

function getInfo() {
  let inputValue = input.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      listSeries = data;
    });

  paintSeries();
  listenList();
  paintFavList();
  deleteFav();
}

function paintSeries() {
  let resultsHtml = '';
  for (let i = 0; i < listSeries.length; i++) {
    const listId = listSeries[i].show.id;
    const listName = listSeries[i].show.name;
    const listImage = listSeries[i].show.image;
    resultsHtml += `<li  class="js-list-item js-list-color " id="${i}">`;
    resultsHtml += `<h2 class="js-title-film"> ${listName} </h2>`;
    if (listImage === null) {
      resultsHtml += `<img src = "https://fabulousfurs.com/ItemImages/Large/IMAGE_NOT_AVAILABLE_535x764_4.jpg" width="200" alt = "cover selected serie" `;
    } else {
      resultsHtml += `<img src = ${listImage.medium}
        alt = "cover selected serie" >`;
    }
    resultsHtml += `</li>`;
  }
  result.innerHTML = resultsHtml;
}

//function Handler
function favouritesSeries(event) {
  const clickList = parseInt(event.currentTarget.id);
  let listSeriesClick = listSeries[clickList];
  const pathClick = listSeriesClick.show.id;
  const idFavorites = favouritesList.map(function (fa) {
    return fa.show.id;
  }); //En arrays de obPara array de obj. Hago nuevo array. para acceder al objeto acceder a la posicion del id, hago un array nuevo. Entro al objeto para poder acceder al id.

  const clickFavourite = idFavorites.indexOf(pathClick); // indexOf solo sirve para cadena de caracteres o numer

  if (clickFavourite === -1) {
    favouritesList.push(listSeriesClick);
  } else {
    favouritesList.splice(clickFavourite, 1); //parametro 1 posicion, parametro 2, cantidad
  }

  paintSeries();
  listenList();
  paintFavList();
  // deleteFav();
  setLocalStorage();
}

//Delete favourites
function deleteFav() {
  console.log('Hola');
  favouritesList = [];
  favList.innerHTML = '';
  localStorage.clear();
}

deleteItemsBtn.addEventListener('click', deleteFav);

//Listen to each element of the array
function listenList() {
  const listItems = document.querySelectorAll('.js-list-item');
  for (const listItem of listItems) {
    listItem.addEventListener('click', favouritesSeries);
  }
}

function paintFavList() {
  let resultsFav = '';
  for (let i = 0; i < favouritesList.length; i++) {
    const listName = favouritesList[i].show.name;
    const listImage = favouritesList[i].show.image;
    resultsFav += `<li  class="js-result-fav js-list-fav " id="${i}">`;
    resultsFav += `<h3> ${listName} </h3>`;
    if (listImage === null) {
      resultsFav += `<img src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV." alt = "cover selected serie" width="100"`;
    } else {
      resultsFav += `<img src = ${listImage.medium} alt = "cover selected serie" width="100">`;
    }
    resultsFav += `</li>`;
  }

  favList.innerHTML = resultsFav;
}
function getFromLocalStorage() {
  const getItemLocal = localStorage.getItem('objeto');
  if (getItemLocal !== null) {
    favouritesList = JSON.parse(getItemLocal);
  }
}

function setLocalStorage() {
  const stringifyFav = JSON.stringify(favouritesList);
  localStorage.setItem('objeto', stringifyFav);
  paintFavList();
}

btn.addEventListener('click', getInfo);

getFromLocalStorage();
getInfo();
