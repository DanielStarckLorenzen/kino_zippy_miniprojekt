package com.example.kino_zippy_miniprojekt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity

public class Auditorium {

    @Id
    private int id;
    private String name;
    private int seatsNo;

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
}
