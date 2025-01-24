package com.cruise.app.repository;

import com.cruise.app.model.UserRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRegistrationRepository extends JpaRepository<UserRegistration,Long> {
//    boolean existsByName(String name);
    boolean existsByEmail(String email);
//    Optional<UserRegistration> findByName(String name);
    Optional<UserRegistration> findByEmail(String email);
}
