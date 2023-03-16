package com.example.kino_zippy_miniprojekt.controller;

import com.example.kino_zippy_miniprojekt.model.Auditorium;
import com.example.kino_zippy_miniprojekt.model.Movie;
import com.example.kino_zippy_miniprojekt.model.Screening;
import com.example.kino_zippy_miniprojekt.model.Seat;
import com.example.kino_zippy_miniprojekt.repository.AuditoriumRepository;
import com.example.kino_zippy_miniprojekt.repository.MovieRepository;
import com.example.kino_zippy_miniprojekt.repository.ScreeningRepository;
import com.example.kino_zippy_miniprojekt.repository.SeatRepository;
import com.example.kino_zippy_miniprojekt.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/createMovie")
    public Movie createMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @PutMapping("/editMovie/{id}")
    public ResponseEntity<Movie> editMovie(@RequestBody Movie movie, @PathVariable int id) {
        System.out.println(movie.getId());
        if (movieService.checkIfMovieExists(id)) {
            System.out.println(movie.getTitle());
            System.out.println("Movie exists");
            movieRepository.save(movie);
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping("/deleteMovie")
    public void deleteMovie(@RequestBody Movie movie) {
        movieRepository.delete(movie);
    }

    @PostMapping("/createScreening/{movie_id}/{auditorium_id}")
    public Screening createScreening(@RequestBody Screening screening, @PathVariable int movie_id, @PathVariable int auditorium_id) {
        Movie movie = movieRepository.findById(movie_id).get();
        screening.setMovie(movie);
        Auditorium auditorium = auditoriumRepository.findById(auditorium_id).get();
        screening.setAuditorium(auditorium);
        return screeningRepository.save(screening);
    }

    @GetMapping("/getScreenings")
    public List<Screening> getScreenings(){
        return screeningRepository.findAll();
    }

    @GetMapping("/getMovies")
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

}


