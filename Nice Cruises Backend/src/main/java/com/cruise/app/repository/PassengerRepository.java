package com.cruise.app.repository;

import com.cruise.app.model.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    // Custom query method to find passengers by email
    List<Passenger> findByEmail(String email);
    List<Passenger> findByGroupId(Long groupId);

}
