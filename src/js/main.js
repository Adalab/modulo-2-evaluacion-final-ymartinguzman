'use strict';

const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const result = document.querySelector('.js-result');

let inputValue = input.nodeValue;
fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`);
  .then((response) => response.json())
  .then((data) => {

})
