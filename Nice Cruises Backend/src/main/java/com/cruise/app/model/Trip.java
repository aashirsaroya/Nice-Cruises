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
@Table(name = "ASA_TRIP")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRIP_ID")
    private Integer tripId;

    @Column(name = "TOT_NIGHTS", nullable = false)
    private Integer totalNights;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    private List<TripPort> tripPorts;
    @Override
    public String toString() {
        return "Trip{" +
                "tripId=" + tripId +
                ", totalNights=" + totalNights +
                '}';
    }
}
