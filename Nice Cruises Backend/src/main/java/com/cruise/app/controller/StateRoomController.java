package com.cruise.app.controller;

import com.cruise.app.service.StateRoomService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class StateRoomController {
    @Autowired
    private StateRoomService stateRoomService;

    @PostMapping("/staterooms")
    public ResponseEntity<?> addStateRooms(@RequestBody JsonNode stateroomJson){
        stateRoomService.addStateRoomToDB(stateroomJson);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
