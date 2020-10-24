'use strict';

const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const result = document.querySelector('.js-result');
const favList = document.querySelector('.js-result-fav');
//data.show.name
//data.score.image

let listSeries = [];
let favouritesList = [];

function getInfo() {
  //obtener info de la api, tarda!
  let inputValue = input.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      listSeries = data;
    });

  paintSeries();
  listenList();
  paintFavList();
}

function paintSeries() {
  let resultsHtml = '';
  for (let i = 0; i < listSeries.length; i++) {
    resultsHtml += `<li  class="js-list-item js-list-color " id="${i}">`;
    resultsHtml += `<h2> ${listSeries[i].show.name} </h2>`;
    if (listSeries[i].show.image === null) {
      resultsHtml += `<img src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV."`;
    } else {
      resultsHtml += `<img src = ${listSeries[i].show.image.medium}
        alt = picture serie shown >`;
    }
    resultsHtml += `</li>`;
  }
  result.innerHTML = resultsHtml;
}

function favouritesSeries(event) {
  const clickList = parseInt(event.currentTarget.id); //friends o la serie clicada
  console.log(clickList);
  let listSeriesClick = listSeries[clickList];

  const clickFavourite = favouritesList.indexOf(clickList);
  console.log(clickFavourite);

  if (clickFavourite === -1) {
    favouritesList.push(listSeriesClick);
    console.log('lo meto');
    // favouritesList.classList.add('js-list-favourite');
  } else {
    favouritesList.splice(listSeries, 1);
    console.log('lo quito');
    //   favouritesList.splice(clickFavourite, 1);
  }
  // // console.log(favouritesList.splice(clickFavourite, 1));
  console.log(clickList);
  paintSeries();
  listenList();
  paintFavList();
  setLocalStorage();
}
function listenList() {
  const listItems = document.querySelectorAll('.js-list-item');
  for (const listItem of listItems) {
    listItem.addEventListener('click', favouritesSeries);
  }
}

function paintFavList() {
  let resultsFav = '';
  for (let i = 0; i < favouritesList.length; i++) {
    resultsFav += `<li  class="js-result-fav js-list--random" id="${i}">`;
    resultsFav += `<h2> ${favouritesList[i].show.name} </h2>`;
    if (favouritesList[i].show.image === null) {
      resultsFav += `<img src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV."`;
    } else {
      resultsFav += `<img src = ${favouritesList[i].show.image.medium}
      alt = picture serie shown  width="100">`;
    }
    resultsFav += `</li>`;
  }
  console.log(favouritesList);
  favList.innerHTML = resultsFav;
}
function setLocalStorage() {
  localStorage.setItem('object', JSON.stringify(favouritesList));
}

// listenList();
btn.addEventListener('click', getInfo);

//quitar esta línea
btn.click();
