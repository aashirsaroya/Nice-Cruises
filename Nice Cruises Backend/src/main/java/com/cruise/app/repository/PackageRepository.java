package com.cruise.app.repository;

import com.cruise.app.model.Packages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PackageRepository extends JpaRepository<Packages, Integer> {
    Optional<Packages> findByPackageName(String name);
}
