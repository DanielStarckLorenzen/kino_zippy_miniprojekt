package com.example.kino_zippy_miniprojekt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

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
}
