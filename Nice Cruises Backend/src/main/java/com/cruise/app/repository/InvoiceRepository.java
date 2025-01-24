package com.cruise.app.repository;

import com.cruise.app.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
//    @Override
//    Optional<Invoice> findBy(Integer integer);
@Query("SELECT i FROM Invoice i WHERE i.cruiseMerge.mergeID = :meregeID_needed")
Optional<Invoice> findByCruiseMergeMergeId(@Param("meregeID_needed") Integer meregeID_needed);
}
