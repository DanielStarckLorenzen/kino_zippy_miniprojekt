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

    public void updateMovie(Movie movie) {
        int id = movie.getId();
        System.out.println("id = " + id);
        movieRepository.setMovieInfoById(movie.getTitle(), movie.getDirector(), movie.getCast(), movie.getDuration_min(), movie.getPoster_url(), movie.getGenre(), movie.getDescription(), id);

    }

}
