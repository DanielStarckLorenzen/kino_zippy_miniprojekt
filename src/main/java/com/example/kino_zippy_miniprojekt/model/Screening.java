package com.example.kino_zippy_miniprojekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Screening {

    @Id
    private int id;
    private Date screeningStart;
    private Date screeningDate;

    @ManyToOne
    @JoinColumn(name = "auditoriumId", referencedColumnName = "id")
    private Auditorium auditorium;

    @ManyToOne
    @JoinColumn(name = "movieId", referencedColumnName = "id")
    private Movie movie;

    @OneToMany(mappedBy = "screening")
    @JsonBackReference
    private Set<Reservation> kommuner = new HashSet<>();

    public int getId() {
        return id;
    }

    public Date getScreeningStart() {
        return screeningStart;
    }

    public void setScreeningStart(Date screeningStart) {
        this.screeningStart = screeningStart;
    }

    public Date getScreeningDate() {
        return screeningDate;
    }

    public void setScreeningDate(Date screeningDate) {
        this.screeningDate = screeningDate;
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
