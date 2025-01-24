package com.cruise.app.controller;

import com.cruise.app.dto.PasswordResetDTO;
import com.cruise.app.repository.UserRegistrationRepository;
import com.cruise.app.service.EmailService;
import com.cruise.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;
    @Autowired
    private UserRegistrationRepository userRegistrationRepository;


    // Endpoint to request OTP
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        if(userRegistrationRepository.existsByEmail(email)) {
            String otp = emailService.generateAndSaveOtp(email);
            emailService.sendOtpEmail(email, otp);
            return ResponseEntity.ok("OTP has been sent to your email.");
        } else {
            return ResponseEntity.badRequest().body("Email not found in the database");
        }
    }

    // Endpoint to reset password using OTP
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetDTO passwordResetDTO) {
        boolean isValidOtp = emailService.validateOtp(passwordResetDTO.getEmail(), passwordResetDTO.getOtp());
        if (isValidOtp) {
            emailService.updatePassword(passwordResetDTO.getEmail(), passwordResetDTO.getNewPassword());
            return ResponseEntity.ok("Password has been updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired OTP.");
        }
    }
}
