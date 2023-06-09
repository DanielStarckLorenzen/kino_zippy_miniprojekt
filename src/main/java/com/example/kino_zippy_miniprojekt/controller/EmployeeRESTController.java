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

    @Autowired
    private SeatReservedRepository seatReservedRepository;
    @PostMapping("/createMovie")
    public Movie createMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @PutMapping("/editMovie")
    public ResponseEntity<Movie> editMovie(@RequestBody Movie movie) {
        Optional<Movie> findMovie = movieRepository.findMovieById(movie.getId());
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

    @PutMapping("/updateScreening")
    public Screening updateScreening(@RequestBody Screening screening) {
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

    @PostMapping("/createReservation/{screening_id}")
    public Reservation createReservation(@RequestBody Reservation reservation, @PathVariable int screening_id) {
        System.out.println("L. 115 - Reservation: " + reservation.getReservationContact());
        System.out.println("L. 116 - Screening: " + screening_id);

        reservation.setScreening(screeningRepository.findById(screening_id).get());

        return reservationRepository.save(reservation);
    }

    @PostMapping("/createSeatReservation")
    public SeatReserved createSeatReservation(@RequestBody SeatReserved seatReserved) {
        Reservation reservation = reservationRepository.findFirstByOrderByIdDesc();
        seatReserved.setReservation(reservation);
        return seatReservedRepository.save(seatReserved);
    }
    
    @GetMapping("/getAllReservations")
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping("/deleteReservation")
    public void deleteReservation(@RequestBody Reservation reservation) {
        List<SeatReserved> reservedSeatsToBeRemoved = seatReservedRepository.findAllByReservationId(reservation.getId());
        seatReservedRepository.deleteAll(reservedSeatsToBeRemoved);
        reservationRepository.delete(reservation);
    }

    @GetMapping("/getSeatsReservedFromReservation/{id}")
    public List<SeatReserved> getSeatsReservedFromReservation(@PathVariable int id) {
        return seatReservedRepository.findAllByReservationId(id);
    }

    @PostMapping("/updateReservation")
    public Reservation updateReservation(@RequestBody Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @GetMapping("/getReservedSeatsFromScreening/{id}")
    public List<SeatReserved> getReservedSeatsFromScreening(@PathVariable int id) {
        return seatReservedRepository.findAllByReservationScreening_Id(id);
    }

    @GetMapping("getAllPaidSeats/{paid}")
    public List<SeatReserved> getReservedSeatsPaid(@PathVariable boolean paid){
        return seatReservedRepository.findAllByReservationPaid(paid);
    }

}


