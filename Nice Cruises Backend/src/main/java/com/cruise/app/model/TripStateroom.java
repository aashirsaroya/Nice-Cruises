package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "ASA_TRIP_STATEROOM")
public class TripStateroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "TRIP_ID", referencedColumnName = "TRIP_ID", nullable = false)
    private Trip trip;

    @ManyToOne
    @JoinColumn(name = "STATEROOM_ID", referencedColumnName = "STATEROOM_ID", nullable = false)
    private StateRoom stateroom;

    @Column(name = "PRICE_PER_NIGHT", nullable = false)
    private Double pricePerNight;

    @Override
    public String toString() {
        return "TripStateroom{" +
                "id=" + id +
                ", trip=" + (trip != null ? trip.getTripId() : "null") + // Use trip ID to avoid recursion
                ", stateroom=" + (stateroom != null ? stateroom.getStateroomId() : "null") + // Use stateroom ID
                ", pricePerNight=" + pricePerNight +
                '}';
    }

}
