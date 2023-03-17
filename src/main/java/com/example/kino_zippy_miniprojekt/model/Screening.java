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
    private Auditorium projection_room;

    @ManyToOne
    @JoinColumn(name = "Projection_Movie", referencedColumnName = "id")
    private Movie projection_movie;

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

    public Auditorium getProjection_room() {
        return projection_room;
    }

    public void setProjection_room(Auditorium auditorium) {
        this.projection_room = auditorium;
    }

    public Movie getProjection_movie() {
        return projection_movie;
    }

    public void setProjection_movie(Movie movie) {
        this.projection_movie = movie;
    }

    public Set<Reservation> getReservation() {
        return reservation;
    }

    public void setReservation(Set<Reservation> kommuner) {
        this.reservation = kommuner;
    }
}
