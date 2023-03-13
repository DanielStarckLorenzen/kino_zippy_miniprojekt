package com.example.kino_zippy_miniprojekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Reservation {

    @Id
    private int id;
    private int screeningId;
    private int reservationContact;
    private boolean reserved;
    private boolean paid;
    private boolean active;
    private int seatId;

    @ManyToOne
    @JoinColumn(name = "screeningId", referencedColumnName = "id")
    private Screening screening;

    @OneToMany(mappedBy = "reservation")
    @JsonBackReference
    private Set<Seat> seats = new HashSet<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getScreeningId() {
        return screeningId;
    }

    public void setScreeningId(int screeningId) {
        this.screeningId = screeningId;
    }

    public int getReservationContact() {
        return reservationContact;
    }

    public void setReservationContact(int reservationContact) {
        this.reservationContact = reservationContact;
    }

    public boolean isReserved() {
        return reserved;
    }

    public void setReserved(boolean reserved) {
        this.reserved = reserved;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    public Set<Seat> getSeats() {
        return seats;
    }

    public void setSeats(Set<Seat> seats) {
        this.seats = seats;
    }
}
