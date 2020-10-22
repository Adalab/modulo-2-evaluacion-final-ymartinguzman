'use strict';

const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const result = document.querySelector('.js-result');
//data.show.name
//data.score.image

function getInfo() {
  let inputValue = input.value;
  // console.log(inputValue);
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`);
    .then((response) => response.json())
    .then((data) => {
    for (const list of data) {
      // console.log(list);
    }
  });
}

btn.addEventListener("click", getInfo);