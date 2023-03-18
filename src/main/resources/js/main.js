const urlPostMovie = "http://localhost:8080/createMovie";
const urlGetMovies = "http://localhost:8080/getMovies";
const urlEditMovie = "http://localhost:8080/editMovie";
const urlDeleteMovie = "http://localhost:8080/deleteMovie";
const urlCreateScreening = "http://localhost:8080/createScreening";
const urlGetScreenings = "http://localhost:8080/getScreenings";
const urlGetMovieScreenings = "http://localhost:8080/getMovieScreenings";
const urlUpdateScreening = "http://localhost:8080/updateScreening";

const pbAddMovie = document.getElementById("pbAddMovie");
pbAddMovie.addEventListener("click", newMovie);
function newMovie() {
    const movie = {
        title: document.getElementById("title").value,
        director: document.getElementById("director").value,
        cast: document.getElementById("cast").value,
        duration_min: document.getElementById("durationMin").value,
        description: document.getElementById("description").value,
        genre: document.getElementById("genre").value,
        poster_url: document.getElementById("posterUrl").value,
    }
    postMovie(movie, urlPostMovie);
    alert("Movie added");
    window.location.reload();
}

function fetchMovie(url, postMovieRequest) {
    return fetch(url, postMovieRequest).then(response => response.json);
}
async function postMovie(movie, url) {
    const postMovieRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(movie)
    };
   await fetchMovie(url, postMovieRequest);
}

async function postScreening(screening, url) {
    const postScreeningRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(screening)
    };
    await fetchMovie(url, postScreeningRequest);
}

async function putMovie(movie, url) {
    const putMovieRequest = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: ""
    };
    const jsonString = JSON.stringify(movie);
    putMovieRequest.body = jsonString;

    const response = await fetchMovie(url, putMovieRequest);
    console.log(response);
    if (!response.ok) {
        alert("Det gik ikke godt med update");
    }
    return response;
}

const posterUrlInput = document.getElementById("posterUrl");
posterUrlInput.addEventListener("input", updateMoviePoster);

function updateMoviePoster() {
    let poster = document.getElementById("poster");
    const posterUrl = posterUrlInput.value;
    const img = new Image();
    img.onload = () => {
        poster.src = posterUrl;
    };
    img.onerror = () => {
        poster.src = "https://raw.githubusercontent.com/DanielStarckLorenzen/kino_zippy_miniprojekt/master/assets/placeholder-image-vertical.png";
    };
    img.src = posterUrl;
}



function fetchAllMovies(url) {
    console.log(url);
    return fetch(url).then((response) => response.json());
}

async function showAllMovies() {
    console.log("Show movies")
    let movieList = await fetchAllMovies(urlGetMovies);
    console.log(movieList);

    movieList.forEach(createCard)
}



function createCard(movie) {
    const movieContainer = document.querySelector(".row-cols-auto");
    const movieCard = document.createElement("div");
    movieCard.classList.add("card");
    movieCard.classList.add("movieCard");
    movieCard.addEventListener("click", function () {
        if (window.location.href.indexOf("createScreening") > -1) {
            seeSelectedCardForScreening(movie);
        } else {
            seeSelectedCard(movie);
        }
    });
    movieCard.style.width = "285px";
    movieContainer.appendChild(movieCard);

    const moviePoster = document.createElement("img");
    moviePoster.classList.add("card-img-top");
    moviePoster.classList.add("moviePoster");
    movieCard.appendChild(moviePoster);
    const img = new Image();
    img.onload = () => {
        moviePoster.src = movie.poster_url;
    };
    img.onerror = () => {
        moviePoster.src = "https://raw.githubusercontent.com/DanielStarckLorenzen/kino_zippy_miniprojekt/master/assets/placeholder-image-vertical.png";
    };
    img.src = movie.poster_url;

    const movieCardBody = document.createElement("div");
    movieCardBody.classList.add("card-body");
    movieCard.appendChild(movieCardBody);

    const movieTitle = document.createElement("h5");
    movieTitle.classList.add("card-title");
    movieTitle.innerText = movie.title;
    movieCardBody.appendChild(movieTitle);

    const movieDescription = document.createElement("p");
    movieDescription.classList.add("card-text");
    movieDescription.innerText = movie.description;
    movieCardBody.appendChild(movieDescription);

    const pbSearchMovie = document.querySelector(".movieSearchButton");
    pbSearchMovie.addEventListener("click", searchMovie);
    const inputSearchMovie = document.querySelector(".movieSearch");
    inputSearchMovie.addEventListener("input", searchMovie);



}

function seeSelectedCard(movie){
    console.log(movie);
    const selectedCard = document.getElementById("selectedCardOverlay");
    selectedCard.classList.remove("hide");
    selectedCard.classList.add("show");
    const seeMovies = document.getElementById("seeMovies");
    seeMovies.classList.add("fadeBackground");

    const title = document.getElementById("title");
    title.value = movie.title;

    const director = document.getElementById("director");
    director.value = movie.director;

    const cast = document.getElementById("cast");
    cast.innerText = movie.cast;

    const description = document.getElementById("description");
    description.innerText = movie.description;

    const durationMin = document.getElementById("durationMin");
    durationMin.value = movie.duration_min;

    const genre = document.getElementById("genre");
    genre.value = movie.genre;

    const posterUrl = document.getElementById("posterUrl");
    posterUrl.value = movie.poster_url;
    let posterSelectedUrl = posterUrl.value;

    const poster = document.querySelector(".editMoviePoster");

    const img = new Image();
    img.onload = () => {
        poster.src = movie.poster_url;
    };
    img.onerror = () => {
        poster.src = "https://raw.githubusercontent.com/DanielStarckLorenzen/kino_zippy_miniprojekt/master/assets/placeholder-image-vertical.png";
    };
    img.src = movie.poster_url;

    const pbCancelEditMovie = document.getElementById("pbCancelMovie");
    pbCancelEditMovie.addEventListener("click", cancelEditMovie);

    const pbEditMovie = document.getElementById("pbSaveMovie");
    pbEditMovie.addEventListener("click", function() {
        editMovie(movie);
    });

    const pbDeleteMovie = document.getElementById("pbDeleteMovie");
    pbDeleteMovie.addEventListener("click", function (){
        deleteMovie(movie)
    });
}

function cancelEditMovie() {
    console.log("cancel");
    const selectedCard = document.getElementById("selectedCardOverlay");
    selectedCard.classList.remove("show");
    selectedCard.classList.add("hide");
    const seeMovies = document.getElementById("seeMovies");
    seeMovies.classList.remove("fadeBackground");
}

function searchMovie() {
    const input = document.querySelector(".movieSearch");
    const filter = input.value.toUpperCase();
    const movieCards = document.getElementsByClassName("movieCard");
    for (let i = 0; i < movieCards.length; i++) {
        let movieTitle = movieCards[i].getElementsByTagName("h5")[0];
        if (movieTitle.innerText.toUpperCase().indexOf(filter) > -1) {
            movieCards[i].style.display = "";
        } else {
            movieCards[i].style.display = "none";
        }
    }
}

function editMovie(movie) {
    putMovie(movie, urlEditMovie + "/" + movie.id);
    alert("Movie edited successfully");
    cancelEditMovie();
}

function deleteMovie(movie){
    console.log(movie.id);
    postMovie(movie, urlDeleteMovie);
    cancelEditMovie();
    window.location.reload();
}

function seeSelectedCardForScreening(movie) {
    console.log(movie);
    const selectedCard = document.getElementById("selectedCardOverlayForScreening");
    selectedCard.classList.remove("hide");
    selectedCard.classList.add("show");
    const seeMovies = document.getElementById("seeMovies");
    seeMovies.classList.add("fadeBackground");

    const poster = document.querySelector(".editMoviePoster");

    const img = new Image();
    img.onload = () => {
        poster.src = movie.poster_url;
    };
    img.onerror = () => {
        poster.src = "https://raw.githubusercontent.com/DanielStarckLorenzen/kino_zippy_miniprojekt/master/assets/placeholder-image-vertical.png";
    };
    img.src = movie.poster_url;

    const movieTitle = document.querySelector(".createScreeningMovieTitle");
    movieTitle.innerText = movie.title;

    const movieGenre = document.querySelector(".createScreeningMovieGenre");
    movieGenre.innerText = movie.genre;

    const movieDuration = document.querySelector(".createScreeningMovieDuration");
    movieDuration.innerText = movie.duration_min + " minutes";

    const pbSaveScreening = document.getElementById("pbSaveScreening")
    pbSaveScreening.addEventListener("click", function() {
        createScreening(movie);
    });
    const pbCancelScreening = document.getElementById("pbCancelScreening");
    pbCancelScreening.addEventListener("click", cancelCreateScreening);
}

function createScreening(movie) {
    const cinema1 = document.getElementById("option1");
    let cinema1Id = cinema1.value;
    const cinema2 = document.getElementById("option2");
    let cinema2Id = cinema2.value;
    let cinemaId = 1;
    if (cinema1.checked) {
        cinemaId = cinema1Id;
    } else cinemaId = cinema2Id;

    console.log(cinemaId);
    const screening = {
        screening_start: document.getElementById("screeningTime").value,
        screening_date: document.getElementById("screeningDate").value,
    }
    console.log(screening);
    postScreening(screening,urlCreateScreening + "/" + movie.id + "/" + cinemaId);
    alert("Screening added");
    cancelCreateScreening();

}

function cancelCreateScreening() {
    console.log("cancel");
    const selectedCard = document.getElementById("selectedCardOverlayForScreening");
    selectedCard.classList.remove("show");
    selectedCard.classList.add("hide");
    const seeMovies = document.getElementById("seeMovies");
    seeMovies.classList.remove("fadeBackground");
    window.location.reload();
}

function createScreeningCard(screening, addedScreenings) {
    if (addedScreenings.includes(screening.id)) {
        return;
    }

    let movie = screening.projectionMovie;
    const existingScreenings = document.querySelectorAll(".movieCard");
    let screeningCard = null;
    for (let i = 0; i < existingScreenings.length; i++) {
        let movie2 = existingScreenings[i].querySelector(".card-title").innerText;
        if (movie2 === screening.projectionMovie.title) {
            const existingMovie = existingScreenings[i].querySelector(".card-title").innerText;
            if (existingMovie === movie.title) {
                screeningCard = existingScreenings[i];
                break;
            }
        }
    }

    if (!screeningCard) {
        const screeningContainer = document.querySelector(".row-cols-auto");
        screeningCard = document.createElement("div");
        screeningCard.classList.add("card");
        screeningCard.classList.add("movieCard");
        screeningCard.addEventListener("click", function () {
            editScreening(screening.projectionMovie, screening);
        });
        screeningCard.style.width = "285px";
        screeningContainer.appendChild(screeningCard);

        const moviePoster = document.createElement("img");
        moviePoster.classList.add("card-img-top");
        moviePoster.classList.add("moviePoster");
        screeningCard.appendChild(moviePoster);

        const img = new Image();
        img.onload = () => {
            moviePoster.src = movie.poster_url;
        };
        img.onerror = () => {
            moviePoster.src = "https://raw.githubusercontent.com/DanielStarckLorenzen/kino_zippy_miniprojekt/master/assets/placeholder-image-vertical.png";
        };
        img.src = movie.poster_url;

        const screeningCardBody = document.createElement("div");
        screeningCardBody.classList.add("card-body");
        screeningCardBody.id = movie.id;
        screeningCard.appendChild(screeningCardBody);

        const movieTitle = document.createElement("h5");
        movieTitle.classList.add("card-title");
        movieTitle.innerText = movie.title;
        screeningCardBody.appendChild(movieTitle);
    }

    const screeningCardBody = screeningCard.querySelector(".card-body");
    const newScreenings = document.createElement("p");
    newScreenings.classList.add("card-text");
    newScreenings.innerText = screening.screening_date + " " + screening.screening_start;
    newScreenings.classList.add("screen" + screening.id);
    newScreenings.setAttribute("value", screening.id);
    newScreenings.addEventListener("click", function() {
        editScreening(movie, screening);
    });
    screeningCardBody.appendChild(newScreenings);

    //const pbScreeningCard = document.querySelector(".card");
    const pbSearchMovie = document.querySelector(".movieSearchButton");
    pbSearchMovie.addEventListener("click", searchMovie);
    const inputSearchMovie = document.querySelector(".movieSearch");
    inputSearchMovie.addEventListener("input", searchMovie);

    addedScreenings.push(screening.id);
}


function editScreening(movie, screening) {
    console.log(screening);
    console.log(movie);
    const selectedCard = document.getElementById("selectedCardOverlayForScreeningEdit");
    selectedCard.classList.remove("hide");
    selectedCard.classList.add("show");
    const seeScreenings = document.getElementById("seeScreenings");
    seeScreenings.classList.add("fadeBackground");

    const poster = document.querySelector(".editMoviePoster");

    const img = new Image();
    img.onload = () => {
        poster.src = movie.poster_url;
    };
    img.onerror = () => {
        poster.src = "https://raw.githubusercontent.com/DanielStarckLorenzen/kino_zippy_miniprojekt/master/assets/placeholder-image-vertical.png";
    };
    img.src = movie.poster_url;

    const movieTitle = document.querySelector(".editScreeningMovieTitle");
    movieTitle.innerText = movie.title;

    const movieGenre = document.querySelector(".editScreeningMovieGenre");
    movieGenre.innerText = movie.genre;

    const movieDuration = document.querySelector(".editScreeningMovieDuration");
    movieDuration.innerText = movie.duration_min + " minutes";

    const screeningSelect = document.getElementById("screeningSelect");
    screeningSelect.innerHTML = ""; // remove existing options

    getAllMovieScreenings(movie).then((screenings) => {
        const screeningList = screenings;
        for (const screening of screenings) {
            const option = document.createElement("option");
            const value = `${screening.screening_date} ${screening.screening_start}`;
            option.textContent = value;
            option.classList.add("dateTimeOption");
            option.setAttribute("value", screening.id);
            screeningSelect.appendChild(option);
        }

        // get the first screening from the list of screenings
        const firstScreening = screeningList[0];

        // set the input fields with the first screening's date and time
        const screeningDateInput = document.getElementById("screeningDate");
        const screeningTimeInput = document.getElementById("screeningTime");
        screeningDateInput.value = firstScreening.screening_date;
        screeningTimeInput.value = firstScreening.screening_start;


        screeningSelect.addEventListener("change", () => {
            // get the selected datetime from the dropdown
            const selectedDateTime = screeningSelect.value;
            // get the selected screening object based on the selected datetime
            const selectedScreening = screenings.find((screening) => {
                return screening.id === parseInt(selectedDateTime);
            });
            // set the input fields with the selected screening's date and time
            const screeningDateInput = document.getElementById("screeningDate");
            const screeningTimeInput = document.getElementById("screeningTime");
            screeningDateInput.value = selectedScreening.screening_date;
            screeningTimeInput.value = selectedScreening.screening_start;

        });
    });



    const pbSaveScreening = document.getElementById("pbSaveScreening")
    pbSaveScreening.addEventListener("click", updateScreening);

    const pbCancelScreening = document.getElementById("pbCancelScreening");
    pbCancelScreening.addEventListener("click", cancelEditScreening);
}

function fetchAllScreenings(url){
    console.log(url);
    return fetch(url).then((response) => response.json());
}

async function showAllScreenings(){
    let movieList = await fetchAllMovies(urlGetMovies);
    let screeningList = await fetchAllScreenings(urlGetScreenings);
    console.log(screeningList.length + " " + movieList.length);

    let addedScreenings = [];
    screeningList.forEach(function (screening) {
        createScreeningCard(screening, addedScreenings);
    });
}

function cancelEditScreening() {
    console.log("cancel");
    const selectedCard = document.getElementById("selectedCardOverlayForScreeningEdit");
    selectedCard.classList.remove("show");
    selectedCard.classList.add("hide");
    const seeMovies = document.getElementById("seeScreenings");
    seeMovies.classList.remove("fadeBackground");
    window.location.reload();
}

async function getAllMovieScreenings(movie){
    try {
        const screeningList = await fetchAllScreenings(urlGetMovieScreenings + "/" + movie.id);
        return screeningList;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function updateScreening() {
    const screeningChosen = document.querySelector(".dateTimeOption");
    const screeningId = screeningChosen.value;
    const screening = {
        screening_date: document.getElementById("screeningDate").value,
        screening_start: document.getElementById("screeningTime").value,
        screeningId: screeningId,
    };

    console.log(screening);
    console.log(screeningId);

    await putScreening(urlUpdateScreening + "/" + screeningId, screening);
    cancelEditScreening();
}

async function putScreening(url, screening) {
    const putScreeningRequest = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(screening)
    };
    await fetchScreening(url, putScreeningRequest);

}

function fetchScreening(url, putScreeningRequest) {
    console.log(url);
    return fetch(url, putScreeningRequest)
        .then(response => {
            console.log(response.status);
            console.log(response.statusText);
            return response.json();
        });
}