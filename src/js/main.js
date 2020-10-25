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
  // setLocalStorage(); llamar o no¿?cambia algo?
}

function paintSeries() {
  let resultsHtml = '';
  for (let i = 0; i < listSeries.length; i++) {
    resultsHtml += `<li  class="js-list-item js-list-color " id="${i}">`;
    resultsHtml += `<h2 class="js-title-film"> ${listSeries[i].show.name} </h2>`;
    if (listSeries[i].show.image === null) {
      resultsHtml += `<img src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV." alt = cover selected serie `;
    } else {
      resultsHtml += `<img src = ${listSeries[i].show.image.medium}
        alt = cover selected serie >`;
    }
    resultsHtml += `</li>`;
  }
  result.innerHTML = resultsHtml;
}

function favouritesSeries(event) {
  const clickList = parseInt(event.currentTarget.id);
  console.log(clickList);
  let listSeriesClick = listSeries[clickList];
  const clickFavourite = favouritesList.indexOf(clickList);

  if (clickFavourite === -1) {
    favouritesList.push(listSeriesClick);
    console.log('lo pongo');
  }
  //  else if (clickFavourite !== -1 && clickFavourite === clickList) {
  //   console.log('no lo añade mas');
  // }
  // else {
  //   // favouritesList.splice(listSeriesClick, 1);
  //   console.log('lo quito');
  // }
  //  else {
  //   favouritesList.splice(listSeries, 1);
  //   console.log('lo quito');
  //   favouritesList.splice(clickFavourite, 1);

  paintSeries();
  listenList();
  paintFavList();
  // deleteFav();
  setLocalStorage();
}

// function deleteFav() {
//   const deleteItemsBtn = document.querySelector('.btn-delete');
//   for (const deleteItem of deleteItemsBtn) {
//     deleteButton.addEventListener('click', favouritesSeries);
//   }
// }

function listenList() {
  const listItems = document.querySelectorAll('.js-list-item');
  for (const listItem of listItems) {
    listItem.addEventListener('click', favouritesSeries);
  }
}

function paintFavList() {
  let resultsFav = '';
  for (let i = 0; i < favouritesList.length; i++) {
    resultsFav += `<li  class="js-result-fav js-list-fav " id="${i}">`;
    resultsFav += `<h3> ${favouritesList[i].show.name} </h3>`;
    if (favouritesList[i].show.image === null) {
      resultsFav += `<img src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV." alt = cover selected serie width="100"`;
    } else {
      resultsFav += `<img src = ${favouritesList[i].show.image.medium}
      alt = picture serie shown  alt = cover selected serie width="100">`;
    }
    resultsFav += `<button class="btn-delete">X</button>`;
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

// listenList();
btn.addEventListener('click', getInfo);

//quitar esta línea
btn.click();

getFromLocalStorage();
getInfo();
