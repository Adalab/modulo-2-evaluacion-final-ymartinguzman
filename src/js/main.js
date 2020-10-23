'use strict';

const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const result = document.querySelector('.js-result');
//data.show.name
//data.score.image

let listSeries = [];

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
    resultsHtml += `<li  class="js-list-item" id="${i}">`;
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
  console.log('escuchar evento');
  const clickList = parseInt(event.currentTarget.id);
  console.log(clickList);
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
