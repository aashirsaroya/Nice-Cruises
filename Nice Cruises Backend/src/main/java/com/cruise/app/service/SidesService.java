package com.cruise.app.service;

import com.cruise.app.model.Sides;
import com.cruise.app.repository.SidesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SidesService {
    @Autowired
    private SidesRepository sidesRepository;

    public void addSide(Sides sides) {
        if(sidesRepository.existsByName(sides.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"side with this name is already available");
        }
        sidesRepository.save(sides);
    }
    public void deleteSides(String name) {
        if(sidesRepository.existsByName(name)){
            sidesRepository.deleteByName(name);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"side not found in db to delete");
        }
    }

}
