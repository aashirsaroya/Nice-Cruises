package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "ASA_PAYMENT")
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PAYMENT_ID")
    private Integer paymentId;

    @ManyToOne
    @JoinColumn(name = "INVOICE_ID", referencedColumnName = "INVOICE_ID", nullable = false)
    private Invoice invoice;

    @Column(name = "PAYMENT_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date paymentDate;



    @Column(name = "AMOUNT", nullable = false)
    private Double amount;

    @Column(name = "PAYMENT_METHOD", length = 50, nullable = false)
    private String paymentMethod;
    @Override
    public String toString() {
        return "Payment{" +
                "paymentId=" + paymentId +
                ", invoiceId=" + (invoice != null ? invoice.getInvoiceId() : "null") +
                ", paymentDate=" + (paymentDate != null ? paymentDate : "null") +
                '}';
    }
}
