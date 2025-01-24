package com.cruise.app.service;

import com.cruise.app.model.TripPort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TripPortService {
    public TripPort setDateAttributes(String startDateStr, String endDateStr, TripPort tripPort) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

        // Parse the strings to ZonedDateTime
        ZonedDateTime startZonedDateTime = ZonedDateTime.parse(startDateStr, formatter);
        ZonedDateTime endZonedDateTime = ZonedDateTime.parse(endDateStr, formatter);

        // Convert to LocalDate (to ignore time portion)
        LocalDate startDateLocal = startZonedDateTime.toLocalDate();
        LocalDate endDateLocal = endZonedDateTime.toLocalDate();

        // If necessary, convert back to java.util.Date (only if your entity specifically needs java.util.Date)
        java.util.Date startDate = java.util.Date.from(startDateLocal.atStartOfDay(startZonedDateTime.getZone()).toInstant());
        java.util.Date endDate = java.util.Date.from(endDateLocal.atStartOfDay(endZonedDateTime.getZone()).toInstant());

        // Assuming you have setters in your entity
        tripPort.setStartDate(startDate);
        tripPort.setEndDate(endDate);
        return tripPort;
    }

}
