//package com.cruise.app.model;
//
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//@Entity
//@Table(name = "ASA_CRUISE")
//@Getter
//@Setter
//public class Cruise {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "CRUISE_ID", nullable = false)
//    private Integer cruiseId;
//
//    @ManyToOne
//    @JoinColumn(name = "RESTAURANT_ID", referencedColumnName = "RESTAURANT_ID", nullable = false)
//    private Restaurants restaurant;
//
////    @ManyToOne
////    @JoinColumn(name = "PASS_ID", referencedColumnName = "PASS_ID", nullable = false)
////    private Passenger passenger;
//    @Column(name = "GROUP_ID")
//    private Integer groupId;
//
//    @ManyToOne
//    @JoinColumn(name = "ENTERTAINMENT_ID", referencedColumnName = "ENTERTAINMENT_ID", nullable = false)
//    private Entertainment entertainment;
//
//    @ManyToOne
//    @JoinColumn(name = "PACKAGE_ID", referencedColumnName = "PACKAGE_ID", nullable = false)
//    private Packages packages;
//
//    @ManyToOne
//    @JoinColumn(name = "TRIP_ID", referencedColumnName = "TRIP_ID", nullable = false)
//    private Trip trip;
//
//}
package com.cruise.app.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ASA_CRUISE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cruise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CRUISE_ID", nullable = false)
    private Integer cruiseId;
    @Column(name = "CRUISE_NAME", nullable = false)
    private String cruiseName;
}
