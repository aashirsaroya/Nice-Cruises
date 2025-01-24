package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ASA_SIDES")
@Getter
@Setter
public class Sides {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SIDE_ID", nullable = false)
    private Integer sideId;

    @Column(name = "NAME", length = 50, nullable = false)
    private String name;

    @Override
    public String toString() {
        return "Sides{" +
                "sideId=" + sideId +
                ", name='" + name + '\'' +
                '}';
    }

}
