'use strict';

const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const result = document.querySelector('.js-result');
//data.show.name
//data.score.image

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
}

function paintSeries() {
  let resultsHtml = '';
  for (let i = 0; i < listSeries.length; i++) {
    resultsHtml += `<li  class="js-list-item " id="${i}">`;
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
  // console.log(clickList);
  const clickFavourite = favouritesList.indexOf(clickList);
  console.log(clickFavourite);

  if (clickFavourite === -1) {
    favouritesList.push(clickList);
    console.log('lo meto');
    // favouritesList.classList.add('js-list-favourite');
  } else {
    favouritesList.splice(clickFavourite, 1);
    console.log('lo quito');
    //   favouritesList.splice(clickFavourite, 1);
  }
  // // console.log(favouritesList.splice(clickFavourite, 1));

  paintSeries();
  listenList();
}

// let resultsFav = '';
// for (let i = 0; i < favouritesList.length; i++) {
//   resultsFav += `<li  class="js-result-fav js-list-color" id="${i}">`;
//   resultsFav += `<h2> ${favouritesList[i]} </h2>`;
//   if (favouritesList[i] === null) {
//     resultsFav += `<img src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV."`;
//   } else {
//     resultsFav += `<img src = ${favouritesList[i]}
//       alt = picture serie shown >`;
//   }
//   resultsFav += `</li>`;
// }

function listenList() {
  const listItems = document.querySelectorAll('.js-list-item');
  for (const listItem of listItems) {
    listItem.addEventListener('click', favouritesSeries);
  }
}

btn.addEventListener('click', getInfo);

//quitar esta línea
btn.click();
