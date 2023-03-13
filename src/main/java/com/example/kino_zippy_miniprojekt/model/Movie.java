package com.example.kino_zippy_miniprojekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Movie {

    @Id
    private int id;
    private String title;
    private String description;
    private String director;
    private String genre;
    private String duration_min;
    private String poster_url;

    @OneToMany(mappedBy = "movie")
    @JsonBackReference
    private Set<Screening> screenings = new HashSet<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDuration_min() {
        return duration_min;
    }

    public void setDuration_min(String durationMin) {
        this.duration_min = durationMin;
    }

    public String getPoster_url() {
        return poster_url;
    }

    public void setPoster_url(String posterUrl) {
        this.poster_url = posterUrl;
    }

    public Set<Screening> getScreenings() {
        return screenings;
    }

    public void setScreenings(Set<Screening> screenings) {
        this.screenings = screenings;
    }
}
