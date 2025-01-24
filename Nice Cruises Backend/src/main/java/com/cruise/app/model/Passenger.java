package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "ASA_PASSENGER")
@Getter
@Setter
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PASS_ID",nullable = false)
    private Long passId;

    @Column(name = "TYPE", length = 50, nullable = false)
    private String type;

    @Column(name = "FNAME", length = 50, nullable = false)
    private String firstName;

    @Column(name = "LNAME", length = 50, nullable = false)
    private String lastName;

    @Column(name = "DOB", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Column(name = "STREET_1", length = 50, nullable = false)
    private String addressStreet;

    @Column(name = "CITY", length = 50, nullable = false)
    private String city;

    @Column(name = "STATE", length = 50, nullable = false)
    private String state;

    @Column(name = "COUNTRY", length = 50, nullable = false)
    private String country;

    @Column(name = "GENDER", length = 10, nullable = false)
    private String gender;

    @Column(name = "NATIONALITY", length = 50, nullable = false)
    private String nationality;

    @Column(name = "EMAIL", length = 50, nullable = false)
    private String email;

    @Column(name = "PHONE", length = 50, nullable = false)
    private Long phone;

    @Column(name = "GROUP_ID", nullable = false)
    private Long groupId;

    @OneToMany(mappedBy = "passenger", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PassengerStateroom> passengerStaterooms;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Passenger passenger = (Passenger) o;
        return Objects.equals(passId, passenger.passId);  // Compare based on ID
    }

    @Override
    public int hashCode() {
        return Objects.hash(passId);
    }

    @Override
    public String toString() {
        return "Passenger{" +
                "passId=" + passId +
                ", type='" + type + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", addressStreet='" + addressStreet + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", gender='" + gender + '\'' +
                ", nationality='" + nationality + '\'' +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                ", groupId=" + groupId +
                '}';
    }

}


