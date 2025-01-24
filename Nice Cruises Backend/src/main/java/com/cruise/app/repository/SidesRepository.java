package com.cruise.app.repository;

import com.cruise.app.model.Sides;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SidesRepository extends JpaRepository<Sides,Integer> {
    boolean existsByName(String name);
    Optional<Sides> deleteByName(String name);
    Optional<Sides> findByName(String name);
//    Optional<Sides> findAll();
//    Optional<Sides> findByName(String name);
}
