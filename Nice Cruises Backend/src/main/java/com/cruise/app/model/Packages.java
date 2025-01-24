package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ASA_PACKAGES")
@Getter
@Setter
public class Packages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PACKAGE_ID", nullable = false)
    private Integer packageId;

    @Column(name = "PACKAGE_NAME", nullable = false)
    private String packageName;

    @Column(name = "PACKAGE_PRICE", nullable = false)
    private Integer packagePrice;

}
