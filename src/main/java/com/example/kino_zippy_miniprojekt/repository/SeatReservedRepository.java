package com.example.kino_zippy_miniprojekt.repository;

import com.example.kino_zippy_miniprojekt.model.SeatReserved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatReservedRepository extends JpaRepository<SeatReserved, Integer> {

    List<SeatReserved> findAllByReservationId(int id);

    List<SeatReserved> findAllByReservationScreening_Id(int id);

    List<SeatReserved> findAllByReservationPaid(boolean paid);
}
