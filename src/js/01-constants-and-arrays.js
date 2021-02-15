'use strict';

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn');
const result = document.querySelector('.js-result');
const favList = document.querySelector('.js-result-fav');
const deleteItemsBtn = document.querySelector(
  '.container__section--btn-delete'
);
const containerFav = document.querySelector('.js-container');
const deleteFavBtn = document.querySelector('.btn-single-delete');

let listSeries = [];
let favouritesList = [];
