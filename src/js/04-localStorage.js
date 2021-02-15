//Recuperate info from localStorage when refresh
function getFromLocalStorage() {
  const getItemLocal = localStorage.getItem('objeto');
  if (getItemLocal !== null) {
    favouritesList = JSON.parse(getItemLocal);
  }
}

//Set in localStorage favourites
function setLocalStorage() {
  const stringifyFav = JSON.stringify(favouritesList);
  localStorage.setItem('objeto', stringifyFav);
  paintFavList();
}
