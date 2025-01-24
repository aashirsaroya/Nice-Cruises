package com.cruise.app.service;

import com.cruise.app.model.*;
import com.cruise.app.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookingReadService {
    @Autowired
    private PassengerStateroomRepository passengerStateroomRepository;
    @Autowired
    private StateRoomRepository stateRoomRepository;
    @Autowired
    private SidesRepository sidesRepository;
    @Autowired
    private TripStateroomRepository tripStateroomRepository;
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private TripPortRepository tripPortRepository;
    @Autowired
    private CruiseMergeRepository cruiseMergeRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private CruiseRepository cruiseRepository;

    @Transactional
    public Map<String, Object> buildJson(List<Passenger> passengerList, Long groupId) {
        Map<String, Object> json =new HashMap<>();
        List<PassengerStateroom> passengerStateroomList =passengerStateroomRepository.findByGroupId(groupId);
//        for(PassengerStateroom p: passengerStateroomList)
//        {
//            System.out.println("Passenger Stateroom Deets: "+ p);
//        }
        Optional<StateRoom> stateRoomOptional = stateRoomRepository.findById(passengerStateroomList.get(0).getStateroom().getStateroomId());
        StateRoom stateRoom = stateRoomOptional.get();
        System.out.println("stateroom"+stateRoom);
        Optional<Sides> sidesOptional = sidesRepository.findById(stateRoom.getSide().getSideId());
        Sides sides = sidesOptional.get();
        System.out.println("sides"+sides);
//        Optional<TripStateroom> optionalTripStateroom=tripStateroomRepository.findByGroupIdAndStateroomId(groupId,stateRoom.getStateroomId());
//        for(TripStateroom tripStateroom:optionalTripStateroom){
//            System.out.println("tripStateroom"+tripStateroom);
//        }

//        TripStateroom tripStateroom = optionalTripStateroom.get();
        Optional<Trip> optionalTrip = cruiseMergeRepository.findDistinctTripsByGroupId(groupId);
//        Optional<Trip> optionalTrip=tripRepository.findById(tripStateroom.getTrip().getTripId());

        Trip trip = optionalTrip.get();

        Optional<TripPort> optionalTripPort=tripPortRepository.findByTripId(trip.getTripId());

        TripPort tripPort = optionalTripPort.get();

        System.out.println(tripPort+" TRIP tripPort");
        List<CruiseMerge> cruiseMergeList= cruiseMergeRepository.findByGroupAndTripIds(groupId, tripPort.getTrip().getTripId());
        System.out.println("No Problem Here 1");
        List<Invoice>  invoiceList = invoiceRepository.findAll();

        Integer meregeID_needed = -1;
        for(CruiseMerge cruiseMerge: cruiseMergeList) {
            for(Invoice invoice: invoiceList) {
                if(invoice.getCruiseMerge().getMergeID() == cruiseMerge.getMergeID()) {
                    meregeID_needed =cruiseMerge.getMergeID();
                    break;
                }
            }
        }
        Optional<Cruise> optionalCruise = cruiseRepository.findById(cruiseMergeList.get(0).getCruise().getCruiseId());
        Cruise cruise = optionalCruise.get();
        System.out.println("--->"+cruise.getCruiseId()+"getCruiseName "+cruise.getCruiseName());

        Optional<Invoice> optionalInvoice = invoiceRepository.findByCruiseMergeMergeId(meregeID_needed);
        Invoice invoiceForPay = optionalInvoice.get();
        Optional<Payment> optionalPayment = paymentRepository.findByInvoice(invoiceForPay.getInvoiceId());
        Payment payment = optionalPayment.get();
        System.out.println("invoice"+invoiceForPay);
        System.out.println("payment"+payment);
        json.put("cruiseId",cruise.getCruiseId());
        json.put("cruiseName",cruise.getCruiseName());
        json.put("paymentId", payment.getPaymentId());
        json.put("paymentDate",payment.getPaymentDate());
        json.put("payment",payment.getAmount());
        json.put("paymentMethod",payment.getPaymentMethod());
        json.put("invoiceId",invoiceForPay.getInvoiceId());
        json.put("tripId",tripPort.getTrip().getTripId());
        json.put("totalNights", trip.getTotalNights());
        json.put("startPort",tripPort.getStartPort().getPortName());
        json.put("endPort",tripPort.getEndPort().getPortName());
        json.put("stateRoomId",stateRoom.getStateroomId());
        json.put("stateRoomName",stateRoom.getStateroomName());
        json.put("sideId",stateRoom.getSide().getSideId());
        json.put("sideName",stateRoom.getSide().getName());
        json.put("startDate",tripPort.getStartDate());
        json.put("endDate",tripPort.getEndDate());
        json.put("amount", payment.getAmount());
        json.put("groupId", groupId);
        json.put("peopleNum", passengerList.size());
//        json.put("passengerList",passengerList);
//        json.put("cruiseMergeList",cruiseMergeList);
        return json;
    }
}