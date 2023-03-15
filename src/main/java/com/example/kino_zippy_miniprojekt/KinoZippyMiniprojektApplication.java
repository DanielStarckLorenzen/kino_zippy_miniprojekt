package com.example.kino_zippy_miniprojekt;

import com.example.kino_zippy_miniprojekt.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class KinoZippyMiniprojektApplication {



    public static void main(String[] args) {
        SpringApplication.run(KinoZippyMiniprojektApplication.class, args);

    }

}
