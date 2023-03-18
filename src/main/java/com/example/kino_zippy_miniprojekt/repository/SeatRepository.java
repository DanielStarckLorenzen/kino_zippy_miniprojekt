package com.example.kino_zippy_miniprojekt.repository;

import com.example.kino_zippy_miniprojekt.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {

    List<Seat> findAllByAuditoriumId(int id);

}
