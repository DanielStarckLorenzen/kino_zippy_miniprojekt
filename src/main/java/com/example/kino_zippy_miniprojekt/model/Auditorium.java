package com.example.kino_zippy_miniprojekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Auditorium {

    @Id
    private int id;
    private String name;
    private int seatsNo;

    @OneToMany(mappedBy = "projectionRoom")
    @JsonBackReference(value = "auditorium-screening")
    private Set<Screening> screenings = new HashSet<>();

    @OneToMany(mappedBy = "auditorium")
    @JsonBackReference(value = "auditorium-seat")
    private Set<Seat> seats = new HashSet<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSeatsNo() {
        return seatsNo;
    }

    public void setSeatsNo(int seatsNo) {
        this.seatsNo = seatsNo;
    }

    public Set<Screening> getScreenings() {
        return screenings;
    }

    public void setScreenings(Set<Screening> screenings) {
        this.screenings = screenings;
    }

    public Set<Seat> getSeats() {
        return seats;
    }

    public void setSeats(Set<Seat> seats) {
        this.seats = seats;
    }
}
