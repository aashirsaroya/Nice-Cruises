package com.cruise.app.repository;

import com.cruise.app.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p FROM Payment p WHERE p.invoice.invoiceId = :invoiceId")
    Optional<Payment> findByInvoice(@Param("invoiceId") Integer invoiceId);
}
