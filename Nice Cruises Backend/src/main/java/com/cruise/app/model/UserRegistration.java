package com.cruise.app.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@Getter
@Setter

@NoArgsConstructor
@Table(name = "ASA_USERS")
public class UserRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private Long phone;
    @Column(nullable = false)
    private String streetLine1;
    @Column(nullable = true)
    private String streetLine2;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String state;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private Long zipCode;
    @Column(nullable = false)
    private Boolean isAdmin;

    @PrePersist
    protected void prePersist() {
        if (isAdmin == null) {
            isAdmin = false; // Default value set before inserting
        }
    }

    // Fields for OTP
    @Column
    private String otp;

    @Column
    private Date otpExpiry;


    @Override
    public String toString() {
        return "UserRegistration{" +
                "name='" + '\'' +
                ", address='" +  city+" "+state+ '\'' +
                '}';
    }
}
