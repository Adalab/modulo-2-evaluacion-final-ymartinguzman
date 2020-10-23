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
  for (const list of listSeries) {
    result.innerHTML += `<li>`;
    result.innerHTML += `<img src = ${list.show.image.medium}
        alt = picture serie shown >`;
    result.innerHTML += `<h2> ${list.show.name} </h2>`;
    result.innerHTML += `</li>`;
  }
}

btn.addEventListener('click', getInfo);

//quitar esta línea
btn.click();
