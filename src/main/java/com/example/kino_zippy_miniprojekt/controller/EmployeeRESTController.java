package com.example.kino_zippy_miniprojekt.controller;

import com.example.kino_zippy_miniprojekt.model.Movie;
import com.example.kino_zippy_miniprojekt.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class EmployeeRESTController {

    @Autowired
    MovieRepository movieRepository;
    
    @PostMapping("/createMovie")
    public Movie createMovie(@RequestBody Movie movie) {
        System.out.println(movie);
        return movieRepository.save(movie);
    }

}


