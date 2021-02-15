//Listener
btnSearch.addEventListener('click', getInfo);
deleteItemsBtn.addEventListener('click', deleteAllFav);
// deleteFavBtn.addEventListener('click', deleteFav);

//Use enter also as an event
input.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getInfo();
  }
});

getFromLocalStorage();
getInfo();
