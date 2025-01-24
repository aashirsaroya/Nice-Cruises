package com.cruise.app.service;

import com.cruise.app.model.PassengerStateroom;
import com.cruise.app.model.Sides;
import com.cruise.app.model.StateRoom;
import com.cruise.app.model.TripStateroom;
import com.cruise.app.repository.SidesRepository;
import com.cruise.app.repository.StateRoomRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service

public class StateRoomService {
    @Autowired
    private SidesRepository sidesRepository;
    @Autowired
    private StateRoomRepository stateRoomRepository;

    @Transactional
    public void addStateRoomToDB(JsonNode stateroomJson) {
        // Create an ObjectMapper instance
        ObjectMapper mapper = new ObjectMapper();

        // Convert JsonNode to Map<String, Object>
        Map<String, Object> stateroomMap = mapper.convertValue(stateroomJson, Map.class);

        // List to store the newly created StateRoom entities
        List<StateRoom> stateroomList = new ArrayList<>();

        // Fetch all sides from the database
        List<Sides> sidesList = sidesRepository.findAll();

        // Loop through each side and create a StateRoom for each
        for (Sides side : sidesList) {
            // Create a new StateRoom instance
            StateRoom stateroom = new StateRoom();

            // Set properties of the stateroom using values from the map
            if (stateroomMap.containsKey("numOfBalconies")) {
                stateroom.setNumOfBalconies((Integer) stateroomMap.get("numOfBalconies"));
            } else {
                throw new RuntimeException("num of Bathroom error"); // Default value
            }

            if (stateroomMap.containsKey("stateroomName")) {
                stateroom.setStateroomName((String) stateroomMap.get("stateroomName"));
            } else {
                throw new RuntimeException("num of Bathroom error"); // Default name if not provided
            }

            if (stateroomMap.containsKey("numOfBathrooms")) {
                stateroom.setNumOfBathrooms((Integer) stateroomMap.get("numOfBathrooms"));
            } else {
                throw new RuntimeException("num of Bathroom error");// Default number of bathrooms
            }
            if(stateroomMap.containsKey("numOfBeds")) {
                stateroom.setNumOfBeds((Integer) stateroomMap.get("numOfBeds"));

            } else {
                throw new RuntimeException("num of Bathroom error");// Default number of bathrooms
            }

            if (stateroomMap.containsKey("size")) {
                stateroom.setSize((Integer) stateroomMap.get("size"));
            } else {
                throw new RuntimeException("num of Bathroom error"); // Default size if not provided
            }

            stateroom.setSide(side);
            stateroomList.add(stateroom);
        }

        // Save all staterooms to the database
        stateRoomRepository.saveAll(stateroomList);
    }




    // Example usage of the map
}
