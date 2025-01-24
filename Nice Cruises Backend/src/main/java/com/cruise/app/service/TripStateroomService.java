package com.cruise.app.service;

import com.cruise.app.model.StateRoom;
import com.cruise.app.model.Trip;
import com.cruise.app.model.TripStateroom;
import com.cruise.app.repository.TripStateroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
public class TripStateroomService {
    @Autowired
    TripStateroomRepository tripStateroomRepository;

    public void saveTripStateroom(Trip trip, StateRoom stateRoom, Double pricePerNight) {
        TripStateroom tripStateroom =new TripStateroom();
        tripStateroom.setTrip(trip);
        tripStateroom.setStateroom(stateRoom);
        tripStateroom.setPricePerNight(pricePerNight);
        tripStateroomRepository.save(tripStateroom);
    }
}
