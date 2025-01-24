package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Table(name = "ASA_PORT")
public class Port {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PORT_ID")
    private Integer portId;
    @Column(name = "NAME", nullable = false)
    private String portName;
    @Column(name = "STREET_1", length = 100, nullable = false)
    private String street1;
    @Column(name = "STREET_2", length = 100)
    private String street2;

    @Column(name = "CITY", length = 50, nullable = false)
    private String city;

    @Column(name = "STATE", length = 50, nullable = false)
    private String state;

    @Column(name = "COUNTRY", length = 50, nullable = false)
    private String country;

    @Column(name = "NEAREST_AIRPORT", length = 50, nullable = false)
    private String nearestAirport;

    @Column(name = "NUM_PARKING_SPOTS",nullable = false)
    private Integer numParkingSpots;
    @OneToMany(mappedBy = "startPort")
    private List<TripPort> tripPortsStart;

    @OneToMany(mappedBy = "endPort")
    private List<TripPort> tripPortsEnd;
}
