package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "ASA_TRIP_PORT")
//@IdClass(TripPortId.class)
@Getter
@Setter
public class TripPort {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "TRIP_ID", referencedColumnName = "TRIP_ID", nullable = false)
    private Trip trip;

    @ManyToOne
    @JoinColumn(name = "START_PORT", referencedColumnName = "PORT_ID", nullable = false)
    private Port startPort;

    @ManyToOne
    @JoinColumn(name = "END_PORT", referencedColumnName = "PORT_ID", nullable = false)
    private Port endPort;

    @Column(name = "START_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "END_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date endDate;
    @Override
    public String toString() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return "TripPort{" +
                "id=" + id +
                ", tripId=" + (trip != null ? trip.getTripId() : "null") +
                ", startPort=" + (startPort != null ? startPort.getPortName() : "null") +
                ", endPort=" + (endPort != null ? endPort.getPortName() : "null") +
                ", startDate=" + (startDate != null ? dateFormat.format(startDate) : "null") +
                ", endDate=" + (endDate != null ? dateFormat.format(endDate) : "null") +
                '}';
    }
}