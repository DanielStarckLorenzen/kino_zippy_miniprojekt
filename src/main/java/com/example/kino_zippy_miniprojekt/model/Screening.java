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
    private Auditorium auditorium;

    @ManyToOne
    @JoinColumn(name = "Projection_Movie", referencedColumnName = "id")
    private Movie movie;

    @OneToMany(mappedBy = "screening")
    @JsonBackReference(value = "screening-reservation")
    private Set<Reservation> kommuner = new HashSet<>();

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

    public Auditorium getAuditorium() {
        return auditorium;
    }

    public void setAuditorium(Auditorium auditorium) {
        this.auditorium = auditorium;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Set<Reservation> getKommuner() {
        return kommuner;
    }

    public void setKommuner(Set<Reservation> kommuner) {
        this.kommuner = kommuner;
    }
}
