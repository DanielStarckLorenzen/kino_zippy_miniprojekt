const urlPostMovie = "http://localhost:8080/createMovie";
const urlGetMovies = "http://localhost:8080/getMovies";
const urlEditMovie = "http://localhost:8080/editMovie";
const urlDeleteMovie = "http://localhost:8080/deleteMovie";
const urlCreateScreening = "http://localhost:8080/createScreening";
const urlGetScreenings = "http://localhost:8080/getScreenings";

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
    console.log(movie.id)
    postMovie(movie, urlDeleteMovie);
    cancelEditMovie();
}

function seeSelectedCardForScreening(movie) {
    console.log(movie);
    const selectedCard = document.getElementById("selectedCardOverlayForScreening");
    selectedCard.classList.remove("hide");
    selectedCard.classList.add("show");
    const seeMovies = document.getElementById("seeMovies");
    seeMovies.classList.add("fadeBackground");

   /* const movieTheater = document.createElement("h5");
    movieTheater.classList.add("card-title");
    movieTitle.innerText = movie.title;
    movieCardBody.appendChild(movieTitle);*/

    /*
    const poster = document.getElementById("poster");
    const img = new Image();
    img.onload = () => {
        poster.src = movie.poster_url;
    };
    img.onerror = () => {
        poster.src = "https://raw.githubusercontent.com/DanielStarckLorenzen/kino_zippy_miniprojekt/master/assets/placeholder-image-vertical.png";
    };
    img.src = movie.poster_url;

     */

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
    const screening ={
        projection_room: cinemaId,
        projection_movie: movie.id,
        screening_start: document.getElementById("screeningTime").value,
        screening_date: document.getElementById("screeningDate").value,
    }
    postScreening(screening,urlCreateScreening + "/" + movie.id + "/" + cinemaId);
    alert("Screening added");

}

function cancelCreateScreening() {
    console.log("cancel");
    const selectedCard = document.getElementById("selectedCardOverlayForScreening");
    selectedCard.classList.remove("show");
    selectedCard.classList.add("hide");
    const seeMovies = document.getElementById("seeMovies");
    seeMovies.classList.remove("fadeBackground");
}

function createScreeningCard(screening) {
    let movie = screening.projection_movie;
    console.log(movie);
    const screeningContainer = document.querySelector(".row-cols-auto");
    const screeningCard = document.createElement("div");
    screeningCard.classList.add("card");
    screeningCard.classList.add("movieCard");
    screeningCard.addEventListener("click", function () {
        editScreening(screening);
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
    screeningCard.appendChild(screeningCardBody);

    const movieTitle = document.createElement("h5");
    movieTitle.classList.add("card-title");
    movieTitle.innerText = movie.title;
    screeningCardBody.appendChild(movieTitle);

    const screenings = document.createElement("p");
    screenings.classList.add("card-text");
    screenings.innerText = screening.screening_start + screening.screening_date;
    screeningCardBody.appendChild(screenings);

    const pbSearchMovie = document.querySelector(".movieSearchButton");
    pbSearchMovie.addEventListener("click", searchMovie);
    const inputSearchMovie = document.querySelector(".movieSearch");
    inputSearchMovie.addEventListener("input", searchMovie);

}

function editScreening(screening) {

}

function fetchAllScreenings(url){
    console.log(url);
    return fetch(url).then((response) => response.json());
}

async function showAllScreenings(){
    let movieList = await fetchAllMovies(urlGetMovies);
    let screeningList = await fetchAllScreenings(urlGetScreenings);
    console.log(screeningList.length + " " + movieList.length);

    screeningList.forEach(createScreeningCard);
/*
    for (let i = 0; movieList.length > i; i++) {
        let movie = movieList.at(i);
        console.log("jeg er i yderste loop");
        console.log(screening);
        for (let j = 0; movieList.size; j++) {
            let movie = movieList.get(j);
            console.log("Jeg er nu i inderste loop");
            console.log(screening.projection_movie);
            if (movie.id == screening.projection_movie) {
                createScreeningCard(movie, screening);
            }
        }
    }

 */


}
