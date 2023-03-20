package com.example.kino_zippy_miniprojekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Seat {

    @Id
    private int id;
    private int seat_row;
    private int seat_number;


    @OneToMany(mappedBy = "seat")
    @JsonBackReference(value = "seats-reserved")
    private Set<SeatReserved> seatReserved = new HashSet<>();

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

    public Set<SeatReserved> getSeatReserved() {
        return seatReserved;
    }

    public void setSeatReserved(Set<SeatReserved> seatReserved) {
        this.seatReserved = seatReserved;
    }

    public Auditorium getAuditorium() {
        return auditorium;
    }

    public void setAuditorium(Auditorium auditorium) {
        this.auditorium = auditorium;
    }
}
