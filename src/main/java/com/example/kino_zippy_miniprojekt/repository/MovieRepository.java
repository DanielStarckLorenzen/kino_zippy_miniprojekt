package com.example.kino_zippy_miniprojekt.repository;

import com.example.kino_zippy_miniprojekt.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    @Modifying
    @Query("update Movie m set m.title = ?1, m.director = ?2, m.cast = ?3, m.duration_min = ?4, m.poster_url = ?5, m.genre = ?6, m.description = ?7 where m.id = ?8")
    void setMovieInfoById(String title, String director, String cast, int duration_min, String poster_url, String genre, String description, int userId);

}
