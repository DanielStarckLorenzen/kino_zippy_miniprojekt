package com.example.kino_zippy_miniprojekt.repository;

import com.example.kino_zippy_miniprojekt.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
}
