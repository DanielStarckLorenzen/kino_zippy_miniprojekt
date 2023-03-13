let body = {};

const urlPostMovie = "http://localhost:8080/createMovie";

function newMovie() {
    let movie = {
        id: document.getElementById("id").value,
        title: document.getElementById("title").value,
        director: document.getElementById("director").value,
        cast: document.getElementById("cast").value,
        description: document.getElementById("description").value,
        duration_min: document.getElementById("durationMin").value,
        poster_url: document.getElementById("posterUrl").value,
        genre: document.getElementById("genre").value
    };
    postMovie(movie);
}

async function postMovie(movie) {
    body = JSON.stringify(movie);
    console.log(body);
    postMovieRequest.body = body;
    fetch(urlPostMovie, postMovieRequest).catch((error) => console.log(error));
}

const postMovieRequest = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: body
};