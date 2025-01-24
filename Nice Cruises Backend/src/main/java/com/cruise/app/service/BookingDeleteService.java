package com.cruise.app.service;

import com.cruise.app.dto.BookingDTO;
import com.cruise.app.model.*;
import com.cruise.app.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingDeleteService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private PassengerRepository passengerRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PassengerStateroomRepository passengerStateroomRepository;
    @Autowired
    private TripStateroomRepository tripStateroomRepository;
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private TripPortRepository tripPortRepository;
    @Autowired
    private CruiseMergeRepository cruiseMergeRepository;


    @Transactional
    public void deleteBooking(BookingDTO bookingDTO) {

        List<Passenger> passengerList = passengerRepository.findByGroupId(bookingDTO.getGroupId());

        List<PassengerStateroom> passengerStateroomList = passengerStateroomRepository.findByGroupId(bookingDTO.getGroupId());
//        Optional<TripStateroom> optionalTripStateroom=tripStateroomRepository.findByGroupIdAndStateroomId(bookingDTO.getGroupId(),bookingDTO.getStateRoomId());
//        for(:optionalTripStateroom) {
//
//        }
//        TripStateroom tripStateroom = optionalTripStateroom.get();
        //here
//        Optional<Trip> optionalTrip=tripRepository.findById(tripStateroom.getTrip().getTripId());


        Optional<Trip> optionalTrip = cruiseMergeRepository.findDistinctTripsByGroupId(bookingDTO.getGroupId());
        Trip trip = optionalTrip.get();
        Optional<TripPort> optionalTripPort=tripPortRepository.findByTripId(trip.getTripId());
        TripPort tripPort = optionalTripPort.get();
        List<CruiseMerge> cruiseMergeList= cruiseMergeRepository.findByGroupAndTripIds(bookingDTO.getGroupId(), tripPort.getTrip().getTripId());
        Optional<TripStateroom> optionalTripStateroom = tripStateroomRepository.findByTripId(bookingDTO.getTripId());
        TripStateroom tripStateroom = optionalTripStateroom.get();

        paymentRepository.deleteById(bookingDTO.getPaymentId());
        invoiceRepository.deleteById(bookingDTO.getInvoiceId());
        cruiseMergeRepository.deleteAll(cruiseMergeList);
        tripPortRepository.deleteById(tripPort.getId());
        tripStateroomRepository.deleteById(tripStateroom.getId());
        // trip to be deleted
        tripRepository.deleteById(trip.getTripId());
        passengerStateroomRepository.deleteAll(passengerStateroomList);
        passengerRepository.deleteAll(passengerList);
        System.out.println("helloworld one --> this is over");
    }
}
