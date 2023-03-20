package com.example.kino_zippy_miniprojekt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SeatReserved {

    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name="reservationId", referencedColumnName = "id")
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name="seatId", referencedColumnName = "id")
    private Seat seat;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }
}

