package com.example.kino_zippy_miniprojekt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Seat {

    @Id
    private int id;
    private int seat_row;
    private int seat_number;


    @ManyToOne
    @JoinColumn(name = "Reservation_Id", referencedColumnName = "id")
    private Reservation reservation;


    @ManyToOne
    @JoinColumn(name = "Seat_Room", referencedColumnName = "id")
    private Auditorium auditorium;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSeat_row() {
        return seat_row;
    }

    public void setSeat_row(int row) {
        this.seat_row = row;
    }

    public int getSeat_number() {
        return seat_number;
    }

    public void setSeat_number(int number) {
        this.seat_number = number;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Auditorium getAuditorium() {
        return auditorium;
    }

    public void setAuditorium(Auditorium auditorium) {
        this.auditorium = auditorium;
    }
}
