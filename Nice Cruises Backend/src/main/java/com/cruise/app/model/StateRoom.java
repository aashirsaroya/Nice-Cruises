package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "ASA_STATEROOM")
@Getter
@Setter
public class StateRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STATEROOM_ID", nullable = false)
    private Integer stateroomId;

    @Column(name = "STATEROOM_NAME", nullable = false)
    private String stateroomName;

    @Column(name = "SIZE", nullable = false)
    private Integer size;

    @Column(name = "NUM_OF_BEDS", nullable = false)
    private Integer numOfBeds;

    @Column(name = "NUM_OF_BATHROOMS", nullable = false)
    private Integer numOfBathrooms;

    @Column(name = "NUM_OF_BALCONIES", nullable = false)
    private Integer numOfBalconies;

    @ManyToOne
    @JoinColumn(name = "SIDE_ID", referencedColumnName = "SIDE_ID", nullable = false)
    private Sides side;

    @OneToMany(mappedBy = "stateroom", cascade = CascadeType.ALL)
    private List<TripStateroom> tripStaterooms;

    // Getters and setters
    @Override
    public String toString() {
        return "StateRoom{" +
                "stateroomId=" + stateroomId +
                ", stateroomName='" + stateroomName + '\'' +
                ", size=" + size +
                ", numOfBeds=" + numOfBeds +
                ", numOfBathrooms=" + numOfBathrooms +
                ", numOfBalconies=" + numOfBalconies +
                ", side=" + (side != null ? side.getSideId() : "null") + // Use a minimal reference
                ", tripStaterooms=" + (tripStaterooms != null ? tripStaterooms.size() : 0) + // List size instead of full objects
                '}';
    }

}