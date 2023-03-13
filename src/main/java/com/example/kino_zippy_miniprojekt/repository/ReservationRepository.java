package com.example.kino_zippy_miniprojekt.repository;

import com.example.kino_zippy_miniprojekt.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

}
