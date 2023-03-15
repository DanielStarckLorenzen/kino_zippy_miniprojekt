package com.example.kino_zippy_miniprojekt.controller;

import com.example.kino_zippy_miniprojekt.model.Movie;
import com.example.kino_zippy_miniprojekt.model.Screening;
import com.example.kino_zippy_miniprojekt.model.Seat;
import com.example.kino_zippy_miniprojekt.repository.MovieRepository;
import com.example.kino_zippy_miniprojekt.repository.ScreeningRepository;
import com.example.kino_zippy_miniprojekt.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class EmployeeRESTController {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    ScreeningRepository screeningRepository;

    @PostMapping("/createMovie")
    public Movie createMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @PostMapping("/editMovie")
    public Movie editMovie(@RequestBody Movie movie) {
        return null;
    }

    @PostMapping("/deleteMovie")
    public void deleteMovie(@RequestBody Movie movie) {
        movieRepository.delete(movie);
    }

    @PostMapping("/createScreening")
    public Movie createScreening(@RequestBody Screening screening) {
        return null;
    }

    @GetMapping("/getMovies")
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

}


