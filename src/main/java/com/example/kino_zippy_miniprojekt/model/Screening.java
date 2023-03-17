package com.example.kino_zippy_miniprojekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Screening {

    @Id
    private int id;
    private String screening_start;
    private String screening_date;

    @ManyToOne
    @JoinColumn(name = "Projection_Room", referencedColumnName = "id")
    private Auditorium projectionRoom;

    @ManyToOne
    @JoinColumn(name = "Projection_Movie", referencedColumnName = "id")
    private Movie projectionMovie;

    @OneToMany(mappedBy = "screening")
    @JsonBackReference(value = "screening-reservation")
    private Set<Reservation> reservation = new HashSet<>();

    public int getId() {
        return id;
    }

    public String getScreening_start() {
        return screening_start;
    }

    public void setScreening_start(String screeningStart) {
        this.screening_start = screeningStart;
    }

    public String getScreening_date() {
        return screening_date;
    }

    public void setScreening_date(String screeningDate) {
        this.screening_date = screeningDate;
    }

    public Auditorium getProjectionRoom() {
        return projectionRoom;
    }

    public void setProjectionRoom(Auditorium auditorium) {
        this.projectionRoom = auditorium;
    }

    public Movie getProjectionMovie() {
        return projectionMovie;
    }

    public void setProjectionMovie(Movie movie) {
        this.projectionMovie = movie;
    }

    public Set<Reservation> getReservation() {
        return reservation;
    }

    public void setReservation(Set<Reservation> kommuner) {
        this.reservation = kommuner;
    }
}
