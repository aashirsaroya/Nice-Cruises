package com.cruise.app.repository;

import com.cruise.app.model.TripStateroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TripStateroomRepository extends JpaRepository<TripStateroom,Integer> {
    @Query("SELECT ts FROM TripStateroom ts " +
            "JOIN PassengerStateroom ps ON ts.stateroom = ps.stateroom " +
            "WHERE ps.groupId = :groupId AND ps.stateroom.stateroomId = :stateroomId")
    Optional<TripStateroom> findByGroupIdAndStateroomId(@Param("groupId") Long groupId,
                                                    @Param("stateroomId") Integer stateroomId);
    @Query("SELECT ts FROM TripStateroom ts "+
    "WHERE ts.trip.tripId = :tripId")
    Optional<TripStateroom> findByTripId(@Param("tripId") Integer tripId);
}
