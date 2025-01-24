package com.cruise.app.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ASA_CRUISE_MERGE")
@Getter
@Setter
public class CruiseMerge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MERGE_ID", nullable = false)
    private Integer mergeID;

    @ManyToOne
    @JoinColumn(name = "CRUISE_ID", referencedColumnName = "CRUISE_ID", nullable = false)
    private Cruise cruise;

    @ManyToOne
    @JoinColumn(name = "RESTAURANT_ID", referencedColumnName = "RESTAURANT_ID", nullable = false)
    private Restaurants restaurant;

    @ManyToOne
    @JoinColumn(name = "PASS_ID", referencedColumnName = "PASS_ID", nullable = false)
    private Passenger passenger;

    @Column(name = "GROUP_ID")
    private Long groupId;

    @ManyToOne
    @JoinColumn(name = "ENTERTAINMENT_ID", referencedColumnName = "ENTERTAINMENT_ID", nullable = false)
    private Entertainment entertainment;

    @ManyToOne
    @JoinColumn(name = "PACKAGE_ID", referencedColumnName = "PACKAGE_ID", nullable = false)
    private Packages packages;

    @ManyToOne
    @JoinColumn(name = "TRIP_ID", referencedColumnName = "TRIP_ID", nullable = false)
    private Trip trip;

    @Override
    public String toString() {
        return "CruiseMerge{" +
                "mergeID=" + mergeID +
                ", cruise=" + (cruise != null ? cruise.toString() : "null") +
                ", restaurant=" + (restaurant != null ? restaurant.toString() : "null") +
                ", passenger=" + (passenger != null ? passenger.toString() : "null") +
                ", groupId=" + groupId +
                ", entertainment=" + (entertainment != null ? entertainment.toString() : "null") +
                ", packages=" + (packages != null ? packages.toString() : "null") +
                ", trip=" + (trip != null ? trip.toString() : "null") +
                '}';
    }

}