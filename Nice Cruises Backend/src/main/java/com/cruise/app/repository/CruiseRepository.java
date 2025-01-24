package com.cruise.app.repository;

import com.cruise.app.model.Cruise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CruiseRepository extends JpaRepository<Cruise, Integer> {
    Optional<Cruise> findByCruiseName(String cruiseName);
//    Optional<Cruise> findByCruiseId(Integer cruiseId);
}
