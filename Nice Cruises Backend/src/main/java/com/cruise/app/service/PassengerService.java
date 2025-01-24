package com.cruise.app.service;

import com.cruise.app.model.Passenger;
import com.cruise.app.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PassengerService {
    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private BookingReadService bookingReadService;

    public void deleteAllData() {
        // Since we have CASCADE in place, deleting passengers will also delete related staterooms
        passengerRepository.deleteAll();
    }

    public String extractAfterPrefix(String input, String prefix) {
        int index = input.indexOf(prefix);
        if (index != -1) {
            return input.substring(index + prefix.length());  // Extract everything after "group-"
        }
        return "Prefix not found";  // Return an error message or handle as needed
    }

    public List<Map<String, Object>> getBookedList(String email){
        //List of JSONS im gonna return
        List<Map<String, Object>> bookingPageJSON = new ArrayList<>();
        List<Passenger> passengerList = passengerRepository.findByEmail(email);
        for(Passenger p: passengerList)
        {
            System.out.println("Passenger Deets: " + p);
        }
        System.out.println("Done with Passenger Fetch!");
        Set<Long> groupIds = new LinkedHashSet<>();

        for(Passenger passenger: passengerList) {
            groupIds.add((Long) passenger.getGroupId());
        }
                System.out.println("GRoup ID: " + groupIds);

        for(Long groupId: groupIds) {
            List<Passenger> passengersByGroup = passengerRepository.findByGroupId(groupId);
            Map<String, Object> bookingDetails = bookingReadService.buildJson(passengersByGroup, groupId);
            bookingPageJSON.add(bookingDetails);
        }

        return bookingPageJSON;
    }
}
