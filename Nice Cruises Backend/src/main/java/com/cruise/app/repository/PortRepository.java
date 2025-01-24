package com.cruise.app.repository;

import com.cruise.app.model.Port;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PortRepository extends JpaRepository<Port,Integer> {
    Optional<Port> findByPortName(String portName);
}
