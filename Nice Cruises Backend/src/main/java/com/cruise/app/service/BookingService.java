package com.cruise.app.service;

import com.cruise.app.model.*;
import com.cruise.app.repository.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

import static java.lang.Long.parseLong;

@Service
public class BookingService {
    @Autowired
    private UserService userService;
    @Autowired
    private StateRoomService stateRoomService;
    @Autowired
    private StateRoomRepository stateRoomRepository;

    @Autowired
    private SidesService sidesService;

    @Autowired
    private SidesRepository sidesRepository;
    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private PassengerStateroomRepository passengerStateroomRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private TripStateroomService tripStateroomService;

    @Autowired
    private PortRepository portRepository;

    @Autowired
    private TripPortService tripPortService;

    @Autowired
    private TripPortRepository tripPortRepository;

    @Autowired
    private PassengerService passengerService;

    @Autowired
    private CruiseMergeRepository cruiseMergeRepository;
    @Autowired
    private EntertainmentRepository entertainmentRepository;

    @Autowired
    private CruiseRepository cruiseRepository;
    @Autowired
    private RestaurantsRepository restaurantsRepository;

    @Autowired
    private PackageRepository packagesRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Transactional
    public Map<String, Object> savePassengers(JsonNode bookingData) throws ParseException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> bookingDataMap = mapper.convertValue(bookingData, Map.class);
        System.out.println("---->" + bookingDataMap.get("BookingConfirmed"));
        if (bookingDataMap.containsKey("BookingConfirmed")) {
            System.out.println(bookingDataMap.get("BookingConfirmed"));
            Map<String, Object> internalMap = (Map<String, Object>) bookingDataMap.get("BookingConfirmed");
            String emailOwner = (String) internalMap.get("loginOwner");
            System.out.println("---email" + emailOwner);
            String sideOfShip = (String) internalMap.get("sideOfShip");
            System.out.println("---sideOfShip" + sideOfShip);

            String stateroomName = (String) internalMap.get("stateroom");
            System.out.println("---sideOfShip" + stateroomName);

            StateRoom stateroomRequired = stateRoomRepository.findByStateroomNameAndSideName(stateroomName, sideOfShip);


            System.out.println("--> testing " + stateroomRequired.getStateroomId() + "  " + stateroomRequired.getStateroomName());

            // Getting the address of the user from the logged in user email address
            Map<String, Object> address = userService.userAddress(emailOwner);
            if (address == null) {
                throw new RuntimeException("No address found for the provided email: " + emailOwner);
            }

            System.out.println("address" + address);
            List<Passenger> finalPassengerList = new ArrayList<>();

            //pulling group id
            String groupIdString = (String) internalMap.get("groupId");
            groupIdString = passengerService.extractAfterPrefix(groupIdString, "group-");
            Long reqGroupId = Long.parseLong(groupIdString);
            if (internalMap.containsKey("passengerDetails")) {
                List<Map<String, Object>> rawPassengerList = (List<Map<String, Object>>) internalMap.get("passengerDetails");
                for (Map<String, Object> rawPassenger : rawPassengerList) {
//                    Passenger passenger =new Passenger();
//                    passenger.setFirstName((String) rawPassenger.get("firstName"));
//                    passenger.setLastName((String) rawPassenger.get("lastName"));
//                    String dateString= (String) rawPassenger.get("dob");
//                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//                    Date date = sdf.parse(dateString);
//                    passenger.setDateOfBirth(date);
//                    passenger.setType((String) rawPassenger.get("type"));
//                    passenger.setGender((String) rawPassenger.get("gender"));
//                    passenger.setNationality((String) rawPassenger.get("nationality"));
                    Passenger passenger = mapper.convertValue(rawPassenger, Passenger.class);
                    passenger.setAddressStreet((String) address.get("street1"));
                    passenger.setCity((String) address.get("city"));
                    passenger.setState((String) address.get("state"));
                    passenger.setCountry((String) address.get("country"));
                    passenger.setEmail(emailOwner);
                    passenger.setPhone((Long) address.get("phone"));
                    passenger.setGroupId(reqGroupId);
                    finalPassengerList.add(passenger);
                }
                System.out.println("testing passengerList" + finalPassengerList);
                passengerRepository.saveAll(finalPassengerList);
            }
            List<Passenger>requiredPassenger = passengerRepository.findByGroupId(reqGroupId);


            List<PassengerStateroom> passengerStateroomList = new ArrayList<>();
            // passid at a[0]-->
            // groupid at a[1]-->
            Map<String, Object> passAndGroup = new HashMap<>();
            boolean flag = true;

            for (Passenger passenger : requiredPassenger) {
                //Saving the passid and groupid of the adult and use it to generate the invoice and payment receipt
                if (flag && passenger.getType().equalsIgnoreCase("adult")) {
                    passAndGroup.put("passId", passenger.getPassId());
                    passAndGroup.put("groupId", passenger.getGroupId());
                    flag = false;
                }
                PassengerStateroom psObject = new PassengerStateroom();
                psObject.setPassenger(passenger);
                psObject.setStateroom(stateroomRequired);
                psObject.setGroupId(passenger.getGroupId());
                passengerStateroomList.add(psObject);
            }
            passengerStateroomRepository.saveAll(passengerStateroomList);
            //populate trip using number of nights
            Trip trip = new Trip();
            trip.setTotalNights((Integer) internalMap.get("nights"));
            Trip savedTrip = tripRepository.save(trip);
            // The trip ID can be accessed directly from the savedTrip entity
            Integer tripId = savedTrip.getTripId();
            System.out.println(tripId);


            Optional<Trip> optionalTrip = tripRepository.findById(tripId);
            Trip tripForStateroom = optionalTrip.get();
            Trip tripForCruise = optionalTrip.get();

            System.out.println("--->" + tripForStateroom.getTotalNights() + tripForStateroom.getTripId());

            // populating the  stateroom trip table using passengers registered and save it
            String price  = (String) internalMap.get("price");
            Double priceDouble = Double.parseDouble(price);
//            Double price = (Double) internalMap.get("price");
//            Double priceDouble  = Double.valueOf(price); ;
            Integer nights = (Integer) internalMap.get("nights");
            Double pricePerNight = priceDouble / nights.doubleValue();
            // Rounding to 2 decimal places using ceiling
            pricePerNight = Math.ceil(pricePerNight * 100) / 100;
            System.out.println("-->pricePerNight" + pricePerNight);
            tripStateroomService.saveTripStateroom(tripForStateroom, stateroomRequired, pricePerNight);

            // populate the Trip_port table
            TripPort tripPort = new TripPort();
            Optional<Port> optionalStartPort = portRepository.findByPortName((String) internalMap.get("departurePort"));
            if(optionalStartPort.isPresent()) {
                System.out.println("optionalStartPort");
            } else {
                System.out.println("optionalStartPort issue");

            }
            Optional<Port> optionalEndPort = portRepository.findByPortName((String) internalMap.get("destinationPort"));
            if(optionalEndPort.isPresent()) {
                System.out.println("optionalendPort");
            } else {
                System.out.println("optionalStartPort issue");

            }
            Port startPort = optionalStartPort.get();
            Port endPort = optionalEndPort.get();
            tripPort.setStartPort(startPort);
            tripPort.setEndPort(endPort);
            tripPort.setTrip(tripForStateroom);
            tripPort = tripPortService.setDateAttributes((String) internalMap.get("startDate"), (String) internalMap.get("endDate"), tripPort);
            //Save TripPort
            System.out.println(tripPort);
            tripPortRepository.save(tripPort);
            //**          // fill cruise merge **//
            System.out.println("No Problem Here 1");

            // list of entertainments
            List<Entertainment> entertainmentList = entertainmentRepository.findAll();
            Optional<Cruise> optionalCruise = cruiseRepository.findByCruiseName((String)internalMap.get("cruise"));

            // cruise id
            Cruise cruise = optionalCruise.get();
            Optional<Passenger> optionalPassenger = passengerRepository.findById((Long) passAndGroup.get("passId"));

            // passenger id
            Passenger passengerCruise = optionalPassenger.get();
            System.out.println("No Problem Here 2");
            // list of packages--->todo

            List<Packages> packagesList =new ArrayList<>();

            if(internalMap.containsKey("packages")){
                List<Map<String, Object>> packagesRawList= (List<Map<String, Object>>) internalMap.get("packages");
                for(Map<String, Object> packagesRaw: packagesRawList) {
                    Optional<Packages> optionalPackages = packagesRepository.findByPackageName((String) packagesRaw.get("name"));
                    packagesList.add(optionalPackages.get());
                }
            } else {
                throw new RuntimeException("packages key not found");
            }
            System.out.println("No Problem Here 3");
            // list of restaurants
            List<Restaurants> restaurantsList =new ArrayList<>();

            if(internalMap.containsKey("selectedRestaurants")) {
                List<String> rawRestaurantsList = (List<String>) internalMap.get("selectedRestaurants");
                for(String rawRestaurants: rawRestaurantsList) {
                    Optional<Restaurants> optionalRestaurants = restaurantsRepository.findByName(rawRestaurants);
                    restaurantsList.add(optionalRestaurants.get());
                }
            } else {
                throw new RuntimeException("cruise merge insertion failed");
            }
            System.out.println("No Problem Here 4");
            // tripForCruise --> find tripId from here
            List<CruiseMerge> cruiseMergeList =new ArrayList<>();

            // restaurant[0]
            for(Entertainment entertainment: entertainmentList) {
                for(Packages packages: packagesList) {
                    CruiseMerge cruiseMerge =new CruiseMerge();
                    cruiseMerge.setPassenger(passengerCruise);
                    cruiseMerge.setPackages(packages);
                    cruiseMerge.setGroupId((Long) passAndGroup.get("groupId"));
                    cruiseMerge.setRestaurant(restaurantsList.get(0));
                    cruiseMerge.setCruise(cruise);
                    cruiseMerge.setEntertainment(entertainment);
                    cruiseMerge.setTrip(tripForCruise);
                    cruiseMergeList.add(cruiseMerge);

                }
            }
            // restaurant[1]
            for(Entertainment entertainment: entertainmentList) {
                for(Packages packages: packagesList) {
                    CruiseMerge cruiseMerge =new CruiseMerge();
                    cruiseMerge.setPassenger(passengerCruise);
                    cruiseMerge.setPackages(packages);
                    cruiseMerge.setGroupId((Long) passAndGroup.get("groupId"));
                    cruiseMerge.setRestaurant(restaurantsList.get(1));
                    cruiseMerge.setCruise(cruise);
                    cruiseMerge.setEntertainment(entertainment);
                    cruiseMerge.setTrip(tripForCruise);
                    cruiseMergeList.add(cruiseMerge);
                }
            }
            System.out.println("successfull cruise merge");

            cruiseMergeRepository.saveAll(cruiseMergeList);


            // fill the invoice
            Invoice invoice =new Invoice();
            System.out.println("Pass ID: " + passAndGroup.get("passId") + "Group ID: " + passAndGroup.get("groupId"));
            List<CruiseMerge> cruiseMerseSet = cruiseMergeRepository.findByPassengerPassIdAndGroupId((Long) passAndGroup.get("passId"), (Long) passAndGroup.get("groupId"));
            System.out.println("No Problem Here 5");
            // Set invoice date to today's date
//            for(CruiseMerge c: cruiseMerseSet)
//            {
                System.out.println("My output for CruiseMergeSet" + cruiseMerseSet);
            //}

            LocalDate today = LocalDate.now();
            invoice.setInvoiceDate(Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant()));
            // Calculate due date (30 days from today)
            LocalDate dueDate = today.plusDays(30);
            invoice.setDueDate(Date.from(dueDate.atStartOfDay(ZoneId.systemDefault()).toInstant()));
            invoice.setCruiseMerge(cruiseMerseSet.get(0));

            invoice.setInvoiceAmount(priceDouble);
            System.out.println("No Problem Here 6");
            invoiceRepository.save(invoice);

            //fill the payment
            Payment payment =new Payment();
            //

            String currentDate = (String) internalMap.get("currentDate");
            String string = currentDate.substring(0,11);
            string = string.trim().replace(",", "");
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            Date date = dateFormat.parse(string); // Parse the string into Date



//            SimpleDateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy, hh:mm:ss a");
            // Convert LocalDateTime to java.util.Date

            System.out.println("No Problem Here 66");
            payment.setPaymentDate(date);
            payment.setAmount(priceDouble);
            payment.setInvoice(invoice);
            payment.setPaymentMethod((String) internalMap.get("paymentMethod"));
            paymentRepository.save(payment);
            System.out.println("you are set---> lets go");
            return passAndGroup;
        } else {
            throw new RuntimeException("booking confirmed key not available");
        }
    }
}