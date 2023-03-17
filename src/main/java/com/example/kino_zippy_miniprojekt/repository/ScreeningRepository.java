package com.example.kino_zippy_miniprojekt.repository;

import com.example.kino_zippy_miniprojekt.model.Auditorium;
import com.example.kino_zippy_miniprojekt.model.Movie;
import com.example.kino_zippy_miniprojekt.model.Screening;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScreeningRepository extends JpaRepository<Screening, Integer> {

    List<Screening> findAllByProjectionMovie(Movie movie);

//    @Modifying
//    @Query("update Screening s set s.screening_start = ?1, s.screening_date = ?2, s.projectionRoom = ?3, s.projectionMovie = ?4 where s.id = ?5")
//    void updateScreeningById(String screening_start, String screening_date, Auditorium auditorium, Movie movie, int id);

}
