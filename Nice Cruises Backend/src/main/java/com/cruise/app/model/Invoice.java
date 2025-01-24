package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "ASA_INVOICE")
@Getter
@Setter
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "INVOICE_ID", nullable = false)
    private Integer invoiceId;

    @ManyToOne
    @JoinColumn(name = "MERGE_ID", referencedColumnName = "MERGE_ID", nullable = false)
    private CruiseMerge cruiseMerge;

    @Column(name = "INVOICE_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date invoiceDate;

    @Column(name = "DUE_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dueDate;

    @Column(name = "INVOICE_AMOUNT", nullable = false)
    private Double invoiceAmount;

    @Override
    public String toString() {
        return "Invoice{" +
                "invoiceId=" + invoiceId +
                ", cruiseMergeId=" + (cruiseMerge != null ? cruiseMerge.getMergeID() : "null") +
                ", invoiceDate=" + (invoiceDate != null ? invoiceDate : "null") +
                ", dueDate=" + (dueDate != null ? dueDate : "null") +
                ", invoiceAmount=" + (invoiceAmount != null ? invoiceAmount : "null") +
                '}';
    }

}
