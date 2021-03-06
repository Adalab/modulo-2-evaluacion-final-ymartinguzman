//Handler
function favouritesSeries(event) {
  const clickList = parseInt(event.currentTarget.id);
  let listSeriesClick = listSeries[clickList];
  const pathClick = listSeriesClick.show.id;
  const idFavorites = favouritesList.map(function (fa) {
    return fa.show.id;
  }); //To take info from an array with objects, needs to be done accesing into the id position with a new array

  const clickFavourite = idFavorites.indexOf(pathClick);
  if (clickFavourite === -1) {
    favouritesList.push(listSeriesClick);
    containerFav.classList.remove('js-hidden');
  } else {
    favouritesList.splice(clickFavourite, 1);
  }

  paintSeries();
  listenList();
  paintFavList();
  setLocalStorage();
}

//Delete all favourites series
function deleteAllFav() {
  favouritesList = [];
  favList.innerHTML = '';
  localStorage.clear();
}

// //Delete one favourite serie
// function deleteFav(){
//   if(favouritesList)
// }

//Listen to each element of the array
function listenList() {
  const listItems = document.querySelectorAll('.js-list-item');
  for (const listItem of listItems) {
    listItem.addEventListener('click', favouritesSeries);
  }
}

//Paint in HTML in a list, the favourites selected
function paintFavList() {
  let resultsFav = '';
  for (let i = 0; i < favouritesList.length; i++) {
    const listName = favouritesList[i].show.name;
    const listImage = favouritesList[i].show.image;
    const id = favouritesList[i].show.id;
    resultsFav += `<li  class="js-result-fav js-list-fav " id="${i}">`;
    resultsFav += `<h3 class="js-title-film"> ${listName} </h3>`;
    if (listImage === null) {
      resultsFav += `<img src = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV." alt = "cover selected serie" width="100">`;
    } else {
      resultsFav += `<img src = ${listImage.medium} alt = "cover selected serie" width="100">`;
    }
    // resultsFav += `<button class="btn-single-delete" id="${id}">x</button>`;
    resultsFav += `</li>`;
  }

  favList.innerHTML = resultsFav;
}
