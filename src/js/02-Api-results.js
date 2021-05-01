//Call API and get info back
function getInfo() {
  let inputValue = input.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      listSeries = data;
      paintSeries();
      listenList();
      paintFavList();
      deleteAllFav();
    });
}

//Paint in HTML the result of the searching
function paintSeries() {
  let resultsHtml = '';

  for (let i = 0; i < listSeries.length; i++) {
    const listId = listSeries[i].show.id;
    const listName = listSeries[i].show.name;
    const listImage = listSeries[i].show.image;
    resultsHtml += `<li  class="js-list-item js-list-color " id="${i}">`;
    resultsHtml += `<h2 class="js-title-film"> ${listName} </h2>`;
    if (listImage === null) {
      resultsHtml += `<img class="js-list-image" src = "https://fabulousfurs.com/ItemImages/Large/IMAGE_NOT_AVAILABLE_535x764_4.jpg"  alt = "cover selected serie" `;
    } else {
      resultsHtml += `<img class="js-list-image" src = ${listImage.medium} 
        alt = "cover selected serie" >`;
    }

    resultsHtml += `</li>`;
  }

  result.innerHTML = resultsHtml;
}
