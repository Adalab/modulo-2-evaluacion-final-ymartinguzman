//Listener
btn.addEventListener('click', getInfo);

//Use enter also as an event
input.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getInfo();
  }
});

getFromLocalStorage();
getInfo();
