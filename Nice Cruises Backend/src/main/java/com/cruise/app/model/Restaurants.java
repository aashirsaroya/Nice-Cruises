package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "ASA_RESTAURANTS")
@Getter
@Setter
public class Restaurants {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RESTAURANT_ID")
    private Integer restaurantId;

    @Column(name = "NAME", length = 50, nullable = false)
    private String name;

    @Column(name = "START_TIME", nullable = false)
    @Temporal(TemporalType.TIME)
    private Date startTime;

    @Column(name = "END_TIME", nullable = false)
    @Temporal(TemporalType.TIME)
    private Date endTime;

    @Column(name = "FLOOR", nullable = false)
    private Integer floor;

    @Column(name = "SERVE", length = 10, nullable = false)
    private String serve;

}
