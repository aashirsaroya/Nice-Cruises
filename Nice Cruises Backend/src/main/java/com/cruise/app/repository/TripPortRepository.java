package com.cruise.app.repository;

import com.cruise.app.model.TripPort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TripPortRepository extends JpaRepository<TripPort, Integer> {
//    @Override
//    Optional<TripPort> findById(Integer integer);
    // Custom query to fetch TripPort by trip ID
    @Query("SELECT tp FROM TripPort tp WHERE tp.trip.tripId = :tripId")
    Optional<TripPort> findByTripId(Integer tripId);

}
