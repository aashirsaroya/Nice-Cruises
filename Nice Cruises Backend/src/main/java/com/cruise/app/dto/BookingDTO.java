package com.cruise.app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Setter
@Getter
@ToString
public class BookingDTO {

        private Integer sideId;
        private Double amount;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private Date endDate;
        private Long groupId;
        private String cruiseName;
        private Integer tripId;
        private Integer stateRoomId;
        private String sideName;
        private String endPort;
        private Integer peopleNum;
        private Integer cruiseId;
        private String startPort;
        private Integer paymentId;
        private String paymentMethod;
        private Double payment;
        private Integer invoiceId;
        private String stateRoomName;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private Date paymentDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private Date startDate;
        private Integer totalNights;

        // Getters and Setters
    }

