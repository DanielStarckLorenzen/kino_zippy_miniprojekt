const urlPostMovie = "http://localhost:8080/createMovie";

const pbAddMovie = document.getElementById("pbAddMovie");
pbAddMovie.addEventListener("click", newMovie);
function newMovie() {
    const movie = {
        title: document.getElementById("title").value,
        director: document.getElementById("director").value,
        cast: document.getElementById("cast").value,
        durationMin: document.getElementById("durationMin").value,
        description: document.getElementById("description").value,
        genre: document.getElementById("genre").value,
        posterUrl: document.getElementById("posterUrl").value,
    }
    postMovie(movie);
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