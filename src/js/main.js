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
    resultsHtml += `<li  class="js-list-item js-list-color" id="${i}">`;
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
  const clickList = parseInt(event.currentTarget.id);
  console.log(clickList);
  let idClickList = event.currentTarget.id;
  console.log(idClickList);
  // favouritesList.push(clickList);
  for (let i = 0; i < favouritesList.length; i++) {
    if (favouritesList[i].indexOf(idClickList) === -1) {
      listSeries.push(idClickList);
    }
  }
}

function listenList() {
  const listItems = document.querySelectorAll('.js-list-item');
  for (const listItem of listItems) {
    listItem.addEventListener('click', favouritesSeries);
  }
}

btn.addEventListener('click', getInfo);

//quitar esta línea
btn.click();
