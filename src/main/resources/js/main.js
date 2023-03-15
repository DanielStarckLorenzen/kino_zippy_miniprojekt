const urlPostMovie = "http://localhost:8080/createMovie";
const urlGetMovies = "http://localhost:8080/getMovies";

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
    postMovie(movie);
    alert("Movie added");
    window.location.reload();
}

function fetchMovie(url, postMovieRequest) {
    return fetch(url, postMovieRequest).then(response => response.json);
}
async function postMovie(movie) {
    const postMovieRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(movie)
    };
   await fetchMovie(urlPostMovie, postMovieRequest);
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
        seeSelectedCard(movie);
    });
    movieCard.style.width = "17rem";
    movieContainer.appendChild(movieCard);

    const moviePoster = document.createElement("img");
    moviePoster.classList.add("card-img-top");
    moviePoster.classList.add("moviePoster");
    movieCard.appendChild(moviePoster);

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

    let poster = document.querySelector(".moviePoster");

    let img = new Image();
    img.onload = () => {
        poster.src = posterSelectedUrl;
    };
    img.onerror = () => {
        poster.src = "https://raw.githubusercontent.com/DanielStarckLorenzen/kino_zippy_miniprojekt/master/assets/placeholder-image-vertical.png";
    };
    img.src = posterSelectedUrl;
    return movie
}






