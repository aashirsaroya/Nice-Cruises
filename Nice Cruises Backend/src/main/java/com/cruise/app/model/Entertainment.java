package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ASA_ENTERTAINMENT")
@Getter
@Setter
public class Entertainment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ENTERTAINMENT_ID",nullable = false)
    private Integer entertainmentId;

    @Column(name = "ENTERTAINMENT_NAME", nullable = false)
    private String entertainmentName;

    @Column(name = "NUM_OF_UNITS", nullable = false)
    private Integer numOfUnits;

    @Column(name = "FLOOR", nullable = false)
    private String floor;
}