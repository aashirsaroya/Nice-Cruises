package com.cruise.app.repository;

import com.cruise.app.model.Restaurants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantsRepository extends JpaRepository<Restaurants, Integer> {
    Optional<Restaurants> findByName(String name);
}
