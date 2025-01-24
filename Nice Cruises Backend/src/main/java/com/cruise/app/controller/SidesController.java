package com.cruise.app.controller;

import com.cruise.app.model.Sides;
import com.cruise.app.repository.SidesRepository;
import com.cruise.app.service.SidesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/sides")
public class SidesController {
    @Autowired
    private SidesRepository sidesRepository;
    @Autowired
    private SidesService sidesService;

    @GetMapping
    public ResponseEntity<?> getAllSides() {
        try {
            List<Sides> sidesList = sidesRepository.findAll();
            if (!sidesList.isEmpty()) {
                return ResponseEntity.ok(sidesList);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching sides: " + e.getMessage());
        }
    }
    @PostMapping
    public ResponseEntity<?> addSides(@RequestBody Sides sidesInfo) {
        try {

            sidesService.addSide(sidesInfo);
//            userRegistrationRepository.save(userRegistration);
//
            return ResponseEntity.status(HttpStatus.OK).body("New Side added Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching sides: " + e.getMessage());
        }
    }

    @DeleteMapping("/users/{name}")
    public ResponseEntity<?> deleteSides(@PathVariable("name") String name) {
        try {

            sidesService.deleteSides(name);
            return ResponseEntity.status(HttpStatus.OK).body("New Side added Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching sides: " + e.getMessage());
        }
    }

}