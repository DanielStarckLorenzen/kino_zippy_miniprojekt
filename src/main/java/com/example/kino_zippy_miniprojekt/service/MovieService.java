package com.example.kino_zippy_miniprojekt.service;

import com.example.kino_zippy_miniprojekt.model.Movie;
import com.example.kino_zippy_miniprojekt.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    MovieRepository movieRepository;

    public boolean checkIfMovieExists(int id) {
        Optional<Movie> findMovie = movieRepository.findMovieById(id);
        return findMovie.isPresent();

    }

}
