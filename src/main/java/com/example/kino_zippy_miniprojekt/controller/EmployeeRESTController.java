package com.example.kino_zippy_miniprojekt.controller;

import com.example.kino_zippy_miniprojekt.model.*;
import com.example.kino_zippy_miniprojekt.repository.*;
import com.example.kino_zippy_miniprojekt.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
public class EmployeeRESTController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ScreeningRepository screeningRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private MovieService movieService;

    @Autowired
    private AuditoriumRepository auditoriumRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @PostMapping("/createMovie")
    public Movie createMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @PutMapping("/editMovie/{id}")
    public ResponseEntity<Movie> editMovie(@RequestBody Movie movie, @PathVariable int id) {
        Optional<Movie> findMovie = movieRepository.findMovieById(id);
        if(findMovie.isPresent()){
            movieRepository.save(movie);
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/deleteMovie")
    public void deleteMovie(@RequestBody Movie movie) {
        movieRepository.delete(movie);
    }

    @PostMapping("/createScreening/{movie_id}/{auditorium_id}")
    public Screening createScreening(@RequestBody Screening screening, @PathVariable int movie_id, @PathVariable int auditorium_id) {
        Movie movie = movieRepository.findById(movie_id).get();
        screening.setProjectionMovie(movie);
        System.out.println("Auditorium id: " + auditorium_id);
        Auditorium auditorium = auditoriumRepository.findById(auditorium_id).get();
        screening.setProjectionRoom(auditorium);
        return screeningRepository.save(screening);

    }

    @GetMapping("/getScreenings")
    public List<Screening> getScreenings(){
        return screeningRepository.findAll();
    }

    @GetMapping("/getMovieScreenings/{id}")
    public List<Screening> getMovieScreenings(@PathVariable int id){
        System.out.println("Id: " + id);
        Movie movie = movieRepository.findMovieById(id).get();
        return screeningRepository.findAllByProjectionMovie(movie);
    }

    @PutMapping("/updateScreening/{id}")
    public Screening updateScreening(@RequestBody Screening screening, @PathVariable int id) {
        System.out.println("Id: " + id);
        screening = screeningRepository.findById(id).get();

        System.out.println(screening.getId());

        return screeningRepository.save(screening);
    }

    @GetMapping("/getMovies")
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/getSeatsFromAuditorium/{name}")
    public List<Seat> getSeatsOutFromAuditorium(@PathVariable String name) {
        System.out.println("L. 100 - Name: " + name);
        Auditorium auditorium = auditoriumRepository.findAuditoriumByName(name);
        int id = auditorium.getId();
        return seatRepository.findAllByAuditoriumId(id);
    }

    @GetMapping("getAuditoriumFromScreening/{id}")
    public Auditorium getAuditoriumFromScreening(@PathVariable int id) {
        System.out.println("L.106 - Id: " + id);
        Screening screening = screeningRepository.findById(id).get();
        Auditorium auditorium = auditoriumRepository.findById(screening.getProjectionRoom().getId()).get();
        System.out.println(auditorium.getId());
        return auditorium;
    }

    @PostMapping("/createReservation/{screening_id}/{seat_ids}")
    public Reservation createReservation(@RequestBody Reservation reservation, @PathVariable int screening_id, @PathVariable int[] seat_ids) {
        System.out.println("L. 115 - Reservation: " + reservation.getReservationContact());
        System.out.println("L. 116 - Screening: " + screening_id);
        reservation.setScreening(screeningRepository.findById(screening_id).get());

        //Set<Seat> seats = new HashSet<>();
        for (int seat_id : seat_ids) {
            System.out.println("L. 119 - Seat: " + seat_id);
            Seat seat = seatRepository.findById(seat_id).orElse(null);
            if (seat != null) {
                System.out.println("Seat id: " + seat.getId());
                seat.setReservation(reservation);

                seatRepository.save(seat);
            }
            //seats.add(seatRepository.findById(seat_id).get());
        }
        //reservation.setSeats(seats);

        return reservationRepository.save(reservation);
    }

}


