package com.example.kino_zippy_miniprojekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Reservation {

    @Id
    private int id;
    private String reservationContact;
    private boolean reserved;
    private boolean paid;
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "screening_id", referencedColumnName = "id")
    private Screening screening;

    @OneToMany(mappedBy = "reservation")
    @JsonBackReference(value = "reservation-seatReserved")
    private Set<SeatReserved> seatReserved = new HashSet<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getReservationContact() {
        return reservationContact;
    }

    public void setReservationContact(String reservationContact) {
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

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    public Set<SeatReserved> getSeatReserved() {
        return seatReserved;
    }

    public void setSeatReserved(Set<SeatReserved> seatReserved) {
        this.seatReserved = seatReserved;
    }
}
