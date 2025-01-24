package com.cruise.app.repository;

import com.cruise.app.model.CruiseMerge;
import com.cruise.app.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CruiseMergeRepository extends JpaRepository<CruiseMerge, Integer> {
//    void saveAll(List<CruiseMerge> cruiseMergeList);
    /**
     * Find all CruiseMerge entries by passenger.passId and groupId.
     */
    @Query("SELECT DISTINCT cm.trip FROM CruiseMerge cm WHERE cm.groupId = :groupId")
    Optional<Trip> findDistinctTripsByGroupId(Long groupId);
    @Query("SELECT c FROM CruiseMerge c WHERE c.passenger.passId = :passId AND c.groupId = :groupId")
    List<CruiseMerge> findByPassengerPassIdAndGroupId(Long passId, Long groupId);
    @Query("SELECT c FROM CruiseMerge c WHERE c.groupId = :groupId AND c.trip.tripId = :tripId")
    List<CruiseMerge> findByGroupAndTripIds(@Param("groupId") Long groupId,
                                              @Param("tripId") Integer tripId);
//    @Query("SELECT c FROM CruiseMerge c WHERE c.groupId = :groupId AND c.trip.tripId = :tripId AND c.passenger.passId = :passId" )
//    Optional<CruiseMerge> findByGroupAndTripAndPassIds(@Param("groupId") Long groupId,
//                                                       @Param("tripId") Integer tripId, @Param("passId")Long passId);
}
