package com.cruise.app.repository;

import com.cruise.app.model.PassengerStateroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PassengerStateroomRepository extends JpaRepository<PassengerStateroom,Integer> {
    List<PassengerStateroom> findByGroupId(Long groupId);
}
