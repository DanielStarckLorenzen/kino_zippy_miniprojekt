package com.example.kino_zippy_miniprojekt.repository;

import com.example.kino_zippy_miniprojekt.model.Auditorium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditoriumRepository extends JpaRepository<Auditorium, Integer> {

    Auditorium findAuditoriumByName(String name);

}
