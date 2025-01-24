package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ASA_PASSENGER_STATEROOM")
@Getter
@Setter
public class PassengerStateroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "STATEROOM_ID", referencedColumnName = "STATEROOM_ID", nullable = false)
    private StateRoom stateroom;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "PASS_ID", referencedColumnName = "PASS_ID", nullable = false)
    private Passenger passenger;

    @Column(name = "GROUP_ID", nullable = false)
    private Long groupId;
    @Override
    public String toString() {
        return "PassengerStateroom{" +
                "id=" + id +
                ", stateroom=" + (stateroom != null ? stateroom.getStateroomId() : null) + // Avoid full object
                ", passenger=" + (passenger != null ? passenger.getPassId() : null) +    // Avoid full object
                ", groupId=" + groupId +
                '}';
    }


}
