package com.cruise.app.repository;

import com.cruise.app.model.Entertainment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EntertainmentRepository extends JpaRepository<Entertainment, Integer> {
//    Optional<Entertainment> findByEntertainmentName(String entertainmentName);
}
