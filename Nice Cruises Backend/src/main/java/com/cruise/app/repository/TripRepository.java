package com.cruise.app.repository;

import com.cruise.app.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip,Integer> {
    @Override
    Optional<Trip> findById(Integer integer);

}
