'use strict';

const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const result = document.querySelector('.js-result');
//data.show.name
//data.score.image

let listSeries = [];

function getInfo() {
  let inputValue = input.value;
  console.log(inputValue);
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      listSeries = data;
    });

  paintSeries();
}

function paintSeries() {
  let resultsHtml = '';
  for (const list of listSeries) {
    resultsHtml += `<li>`;
    resultsHtml += `<h2> ${list.show.name} </h2>`;
    if (list.show.image === null) {
      resultsHtml += `<img src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV."`;
    } else {
      resultsHtml += `<img src = ${list.show.image.medium}
        alt = picture serie shown >`;
    }
    resultsHtml += `</li>`;
  }
  result.innerHTML = resultsHtml;
}

btn.addEventListener('click', getInfo);

//quitar esta línea
btn.click();
