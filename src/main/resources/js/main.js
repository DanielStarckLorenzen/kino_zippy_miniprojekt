const urlPostMovie = "http://localhost:8080/createMovie";
const urlGetMovies = "http://localhost:8080/getMovies";
const urlEditMovie = "http://localhost:8080/editMovie";
const urlDeleteMovie = "http://localhost:8080/deleteMovie";
const urlCreateScreening = "http://localhost:8080/createScreening";
const urlGetScreenings = "http://localhost:8080/getScreenings";
const urlGetMovieScreenings = "http://localhost:8080/getMovieScreenings";
const urlUpdateScreening = "http://localhost:8080/updateScreening";
const urlGetSeatsFromAuditorium = "http://localhost:8080/getSeatsFromAuditorium";
const urlGetAuditoriumFromScreening = "http://localhost:8080/getAuditoriumFromScreening";
const urlCreateReservation = "http://localhost:8080/createReservation";
const urlCreateSeatReservation = "http://localhost:8080/createSeatReservation"
const urlGetAllReservations = "http://localhost:8080/getAllReservations";
const urlDeleteReservation = "http://localhost:8080/deleteReservation";
const urlGetSeatsReservedFromReservation = "http://localhost:8080/getSeatsReservedFromReservation";
const urlUpdateReservation = "http://localhost:8080/updateReservation";
const urlGetReservedSeatsFromScreening = "http://localhost:8080/getReservedSeatsFromScreening";
const urlGetAllPaidSeats = "http://localhost:8080/getAllPaidSeats"

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

async function putMovie(movie) {
    const putMovieRequest = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(movie)
    };

    const response = await fetch(urlEditMovie, putMovieRequest);
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
        } else if (window.location.href.indexOf("seeMovie") > -1) {
            seeSelectedCard(movie);
        }
    });
    movieCard.style.width = "285px";
    if (window.location.href.indexOf("index") > -1) {
        movieCard.style.pointerEvents = "none";
    }
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

    const durationMin = document.getElementById("duration_min");
    durationMin.value = movie.duration_min;

    const genre = document.getElementById("genre");
    genre.value = movie.genre;

    const posterUrl = document.getElementById("poster_url");
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
    window.location.reload();
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

function searchContact() {
    const input = document.querySelector(".contactSearch");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("reservationTable");
    const columnIndex = 0; // index of the column to search in
    for (let i = 0; i < table.rows.length; i++) {
        let cell = table.rows[i].cells[columnIndex];
        if (cell.innerText.toUpperCase().indexOf(filter) > -1) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }
    }

    // Show the header row if there are any visible rows
    const header = document.getElementById("headerRow");
    const visibleRows = document.querySelectorAll(".contactRow:not([style*='display: none'])");
    if (visibleRows.length > 0) {
        header.style.display = "";
    } else {
        header.style.display = "none";
    }
}

async function editMovie(movie) {
    const title = document.getElementById("title");
    movie.title = title.value;

    const director = document.getElementById("director");
    movie.director = director.value;

    const cast = document.getElementById("cast");
    movie.cast = cast.value;

    const description = document.getElementById("description");
    movie.description = description.value;

    const durationMin = document.getElementById("duration_min");
    movie.duration_min = durationMin.value;

    const genre = document.getElementById("genre");
    movie.genre = genre.value;

    const posterUrl = document.getElementById("poster_url");
    movie.poster_url = posterUrl.value;

    const response = await putMovie(movie);
    console.log(response);
    alert("Movie edited successfully");
    cancelEditMovie();
    window.location.reload();
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
            if (window.location.href.includes("seeScreening")) {
                editScreening(movie, screening);
            } else {
                createReservation(movie, screening);
            }
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

    screeningCardBody.appendChild(newScreenings);

    //const pbScreeningCard = document.querySelector(".card");
    const pbSearchMovie = document.querySelector(".movieSearchButton");
    pbSearchMovie.addEventListener("click", searchMovie);
    const inputSearchMovie = document.querySelector(".movieSearch");
    inputSearchMovie.addEventListener("input", searchMovie);


    //const contactSearch = document.getElementById("reservationContactSearch");
    //contactSearch.addEventListener("input", searchContact);

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
    pbSaveScreening.addEventListener("click", function() {
        updateScreening(screening);
    });

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

async function updateScreening(screening) {
    const screeningChosen = document.querySelector(".dateTimeOption");
    const screeningId = screeningChosen.value;
    const updatedScreening = {
        screening_date: document.getElementById("screeningDate").value,
        screening_start: document.getElementById("screeningTime").value,
        id: screeningId,
        projectionRoom: screening.projectionRoom,
        projectionMovie: screening.projectionMovie
    };

    console.log(updatedScreening);
    console.log(screeningId);

    await putScreening(urlUpdateScreening, updatedScreening);
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

function createReservation(movie, screening) {
    console.log(screening);
    console.log(movie);
    const selectedCard = document.getElementById("selectedCardOverlayForCreateReservation");
    selectedCard.classList.remove("hide");
    selectedCard.classList.add("show");
    const seeScreenings = document.getElementById("seeScreenings");
    seeScreenings.classList.add("fadeBackground");

    const poster = document.querySelector(".createReservationMoviePoster");

    const img = new Image();
    img.onload = () => {
        poster.src = movie.poster_url;
    };
    img.onerror = () => {
        poster.src = "https://raw.githubusercontent.com/DanielStarckLorenzen/kino_zippy_miniprojekt/master/assets/placeholder-image-vertical.png";
    };
    img.src = movie.poster_url;

    const movieTitle = document.querySelector(".createReservationMovieTitle");
    movieTitle.innerText = movie.title;

    const movieGenre = document.querySelector(".createReservationMovieGenre");
    movieGenre.innerText = movie.genre;

    const movieDuration = document.querySelector(".createReservationMovieDuration");
    movieDuration.innerText = movie.duration_min + " minutes";

    const screeningSelect = document.getElementById("screeningSelect");

    //const amountOfReservations = document.getElementById("createReservationAmount").value;

    let selectedSeats = [];

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

        // set the default value of the screeningSelect dropdown
        screeningSelect.value = firstScreening.id;

        const screeningCinema = document.querySelector(".screeningCinema");
        screeningCinema.innerText = firstScreening.projectionRoom.name;

        const seatingPlan = document.getElementById("seatingPlan");
        const reservedSeats = [];

        printSeats(firstScreening, seatingPlan, reservedSeats);

        screeningSelect.addEventListener("change", () => {
            // remove the existing seats
            const seats = document.querySelectorAll(".seat");
            for (const seat of seats) {
                seat.remove();
            }

            // get the selected datetime from the dropdown
            const selectedDateTime = screeningSelect.value;
            // get the selected screening object based on the selected datetime
            const selectedScreening = screenings.find((screening) => {
                return screening.id === parseInt(selectedDateTime);
            });


            getReservedSeatsFromScreening(selectedScreening).then((reservationList) => {
                console.log(reservationList);
                for (const reservation of reservationList) {
                    console.log(reservation.seat.id);
                    reservedSeats.push(reservation.seat.id);
                }

            });

            printSeats(selectedScreening, seatingPlan, reservedSeats);

            /*
            getAuditoriumFromScreening(selectedScreening.id).then((auditorium) => {
                console.log(auditorium.name);
                getSeatsFromAuditorium(auditorium.name).then((seatList) => {
                    console.log(seatList);
                    for (const seat of seatList) {
                        const seatIcon = document.createElement("a");
                        seatIcon.classList.add("seat");
                        seatIcon.setAttribute("data-colindex", seat.seat_number);
                        seatIcon.setAttribute("data-rowindex", seat.seat_row);
                        seatIcon.setAttribute("title", "Row " + seat.seat_row + " - " + "Seat " + seat.seat_number);
                        seatIcon.setAttribute("auditorium", auditorium.id);
                        seatingPlan.style.justifyContent = "center";
                        const seatNumbers = seatList.map(seat => seat.seat_number);
                        const seatsPerRow = Math.max(...seatNumbers);
                        seatingPlan.style.gridTemplateColumns = "repeat(" + seatsPerRow + ", 1fr)";


                        if (reservedSeats.includes(seat.id)) {
                            console.log("Seat is reserved");
                            seatIcon.classList.add("reserved");
                        }


                        seatingPlan.appendChild(seatIcon);

                        const seatImage = document.createElement("img");
                        seatImage.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/24/24868.png");
                        seatIcon.appendChild(seatImage);

                        seatIcon.addEventListener("click", () => {
                            seatAuditoriumId = seatIcon.getAttribute("auditorium");
                            seatColIndex = seatIcon.getAttribute("data-colindex");
                            seatRowIndex = seatIcon.getAttribute("data-rowindex");
                            let choosenSeat = {
                                id: seat.id,
                                auditoriumId: seatAuditoriumId,
                                seat_number: seatColIndex,
                                seat_row: seatRowIndex
                            };
                            if (seatIcon.classList.contains("selected")) {
                                seatIcon.classList.remove("selected");
                                // remove the seat from the selectedSeats array
                                selectedSeats = selectedSeats.filter((selectedSeat) => {
                                    return selectedSeat.seat_number !== choosenSeat.seat_number;
                                });

                            } else {
                                seatIcon.classList.add("selected");
                                selectedSeats.push(choosenSeat);
                            }
                            console.log(selectedSeats);
                        });
                    }
                });
            });*/
        });
    });

    const pbSaveScreening = document.getElementById("pbSaveReservation")
    pbSaveScreening.addEventListener("click", function () {
        saveReservation(screening, selectedSeats);
    });

    const pbCancelScreening = document.getElementById("pbCancelReservation");
    pbCancelScreening.addEventListener("click", cancelCreateReservation);
}

function printSeats(selectedScreening, seatingPlan, reservedSeats) {
    getAuditoriumFromScreening(selectedScreening.id).then((auditorium) => {
        console.log(auditorium.name);
        getSeatsFromAuditorium(auditorium.name).then((seatList) => {
            console.log(seatList);
            for (const seat of seatList) {
                const seatIcon = document.createElement("a");
                seatIcon.classList.add("seat");
                seatIcon.setAttribute("data-colindex", seat.seat_number);
                seatIcon.setAttribute("data-rowindex", seat.seat_row);
                seatIcon.setAttribute("title", "Row " + seat.seat_row + " - " + "Seat " + seat.seat_number);
                seatIcon.setAttribute("auditorium", auditorium.id);
                seatingPlan.style.justifyContent = "center";
                const seatNumbers = seatList.map(seat => seat.seat_number);
                const seatsPerRow = Math.max(...seatNumbers);
                seatingPlan.style.gridTemplateColumns = "repeat(" + seatsPerRow + ", 1fr)";


                if (reservedSeats.includes(seat.id)) {
                    console.log("Seat is reserved");
                    seatIcon.classList.add("reserved");
                }


                seatingPlan.appendChild(seatIcon);

                const seatImage = document.createElement("img");
                seatImage.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/24/24868.png");
                seatIcon.appendChild(seatImage);

                seatIcon.addEventListener("click", () => {
                    seatAuditoriumId = seatIcon.getAttribute("auditorium");
                    seatColIndex = seatIcon.getAttribute("data-colindex");
                    seatRowIndex = seatIcon.getAttribute("data-rowindex");
                    let choosenSeat = {
                        id: seat.id,
                        auditoriumId: seatAuditoriumId,
                        seat_number: seatColIndex,
                        seat_row: seatRowIndex
                    };
                    if (seatIcon.classList.contains("selected")) {
                        seatIcon.classList.remove("selected");
                        // remove the seat from the selectedSeats array
                        selectedSeats = selectedSeats.filter((selectedSeat) => {
                            return selectedSeat.seat_number !== choosenSeat.seat_number;
                        });

                    } else {
                        seatIcon.classList.add("selected");
                        selectedSeats.push(choosenSeat);
                    }
                    console.log(selectedSeats);
                });
            }
        });
    });
}

function cancelCreateReservation() {
    console.log("cancel");
    const selectedCard = document.getElementById("selectedCardOverlayForCreateReservation");
    selectedCard.classList.remove("show");
    selectedCard.classList.add("hide");
    const seeMovies = document.getElementById("seeScreenings");
    seeMovies.classList.remove("fadeBackground");
    window.location.reload();
}

async function saveReservation(screening, selectedSeats) {

    const reservationContact = document.getElementById("reservationContact").value;
    console.log(selectedSeats);
    const selectedSeatsIds = [];
    for (const seat of selectedSeats) {
        selectedSeatsIds.push(seat.id);

    }

    console.log(selectedSeatsIds);
    const reservation = {
        reservationContact: reservationContact,
        reserved: true,
        paid: false,
        active: false,
        screening: screening
    }

    console.log(reservation);

    postReservation(reservation, urlCreateReservation + "/" + screening.id)
        .then(() => createSeatReserved(reservation, selectedSeats))
        .catch(error => console.error(error));



}

async function postReservation(reservation, url) {
    console.log(url);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
    });
    return response.json()
}

async function postSeatReservation(seatReserved, url) {
    console.log(url);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(seatReserved),
    });
    return response.json()
}

function fetchReservation(url, postReservationRequest) {
    return fetch(url, postReservationRequest).then(response => response.json);
}

async function getAuditoriumFromScreening(id) {
    console.log(id);
    let auditorium = await fetchAllSeats(urlGetAuditoriumFromScreening + "/" + id);
    console.log(auditorium);
    return auditorium;
}

async function getSeatsFromAuditorium(auditoriumName) {
    console.log(auditoriumName);
    let seatList = await fetchAllSeats(urlGetSeatsFromAuditorium + "/" + auditoriumName);
    console.log(seatList);
    return seatList;
}

function fetchAllSeats(url) {
    return fetch(url).then((response) => response.json());
}

function createSeatReserved(reservation, selectedSeats) {

    for (let i = 0; i < selectedSeats.length; i++) {
        let seatReserved = {
            reservation: reservation,
            seat: selectedSeats[i]
        }

        console.log(reservation);

        console.log(seatReserved);

        postSeatReservation(seatReserved, urlCreateSeatReservation)
    }

    closeReservation();

}


function createTable(reservation){


    if (reservation.active === false) {

        const tblReservation = document.getElementById("reservationTable")

        let cellCount = 0
        let rowCount = tblReservation.rows.length
        let row = tblReservation.insertRow(rowCount)
        row.classList.add("contactRow");
        row.id = reservation.id;

        let cell = row.insertCell(cellCount++)
        cell.classList.add("reservationContact");
        cell.innerHTML = reservation.reservationContact;

        cell = row.insertCell(cellCount++)
        cell.innerHTML = reservation.screening.projectionMovie.title;

        cell = row.insertCell(cellCount++)
        cell.innerHTML = reservation.screening.screening_date


        cell = row.insertCell(cellCount++)
        cell.innerHTML = reservation.screening.screening_start

        cell = row.insertCell(cellCount++)
        cell.innerHTML = reservation.screening.projectionRoom.name;


        cell = row.insertCell(cellCount++)
        getSeatsReservedFromReservation(reservation).then((seatsReserved) => {
            let breakLine = document.createElement("br");
            for (let i = 0; i < seatsReserved.length; i++) {
                cell.innerHTML += "Seat: " + seatsReserved[i].seat.seat_number + ", Row: " + seatsReserved[i].seat.seat_row + breakLine.outerHTML;
            }

            cell = row.insertCell(cellCount++)
            let pbPay = document.createElement("button");
            pbPay.type = "button";
            pbPay.textContent = "PAY!";
            pbPay.classList.add("btn");
            pbPay.classList.add("btn-success");
            pbPay.style.width = "100px";
            pbPay.style.height = "auto";
            pbPay.addEventListener("click", function () {
                payForReservation(reservation, seatsReserved);
            })
            cell.appendChild(pbPay);

            cell = row.insertCell(cellCount++)
            let pbCancel = document.createElement("button");
            pbCancel.type = "button";
            pbCancel.textContent = "Cancel :(";
            pbCancel.classList.add("btn");
            pbCancel.classList.add("btn-danger");
            pbCancel.style.width = "100px";
            pbCancel.style.height = "auto";
            pbCancel.addEventListener("click", function () {
                deleteReservation(reservation);
            });
            cell.appendChild(pbCancel);
        });

    }
    const contactSearch = document.getElementById("reservationContactSearch");
    contactSearch.addEventListener("input", searchContact);
}

async function getAllReservations() {

    let reservationList = await fetchAllReservations(urlGetAllReservations);
    console.log(reservationList);
    reservationList.forEach(createTable);


}

function fetchAllReservations(url) {
    return fetch(url).then((response) => response.json());
}

async function deleteReservation(reservation) {
    postReservation(reservation, urlDeleteReservation);

    window.location.reload();
}

function payForReservation(reservation, seatsReserved) {
    console.log("Pay!");
    let amountOfTickets = seatsReserved.length;
    console.log(amountOfTickets);
    const price = 150;
    console.log(price);
    let totalPrice = amountOfTickets * price;
    console.log(totalPrice);

    updateReservation(reservation);
    window.location.reload();

    window.location.reload();

}

function closeReservation() {
    const selectedCard = document.getElementById("selectedCardOverlayForCreateReservation");
    selectedCard.classList.remove("show");
    selectedCard.classList.add("hide");
    const seeMovies = document.getElementById("seeScreenings");
    seeMovies.classList.remove("fadeBackground");
    window.location.reload();
}

async function getSeatsReservedFromReservation(reservation) {
    let seatReservedList = await fetchAllSeats(urlGetSeatsReservedFromReservation + "/" + reservation.id);
    console.log(seatReservedList);
    return seatReservedList;
}

async function updateReservation(reservation) {
    reservation.paid = true;
    reservation.active = true;
    postReservation(reservation, urlUpdateReservation);
}

async function getReservedSeatsFromScreening(screening) {
    let seatReservedList = await fetchAllSeats(urlGetReservedSeatsFromScreening + "/" + screening.id);
    return seatReservedList;
}

async function analyticsCalculation() {
    const amountOfReservations = document.getElementById("amountOfReservations");
    const amountOfTicketSold = document.getElementById("amountOfTicketSold");
    const revenueGenerated = document.getElementById("revenueGenerated");
    const amountOfActiveReservations = document.getElementById("amountOfActiveReservations");

    let allReservations = await fetch(urlGetAllReservations).then((response) => response.json())


    let paidTickets = [];
    let activeTickets = []

    for (let reservation of allReservations) {
        if (reservation.paid === true) {
            paidTickets.push(reservation);
        }
        if (reservation.active === true) {
            activeTickets.push(reservation);
        }
    }

    amountOfReservations.innerText = allReservations.length;
    amountOfTicketSold.innerText = paidTickets.length;
    let activePercentage = paidTickets.length / allReservations.length * 100;
    amountOfActiveReservations.innerText = activePercentage + "%";
    if (activePercentage > 80) {
        amountOfActiveReservations.style.color = "green";
    } else if (activePercentage > 40) {
        amountOfActiveReservations.style.color = "yellow";
    } else {
        amountOfActiveReservations.style.color = "red";
    }


    let seatsReservedPaid = await fetch(urlGetAllPaidSeats + "/" + true).then((response) => response.json());

    const price = 150;

    let totalRevenue = seatsReservedPaid.length * price;

    revenueGenerated.innerText = totalRevenue + " kr";

    console.log(totalRevenue);

}

