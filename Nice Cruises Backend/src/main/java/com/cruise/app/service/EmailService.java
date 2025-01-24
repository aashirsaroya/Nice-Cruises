package com.cruise.app.service;

import com.cruise.app.model.UserRegistration;
import com.cruise.app.repository.UserRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;

@Service
public class EmailService {
    // Generate OTP, save it in the database, and return it
    @Autowired
    private UserRegistrationRepository userRegistrationRepository;
    @Autowired
    private JavaMailSender mailSender;
    private BCryptPasswordEncoder passwordEncoder =new BCryptPasswordEncoder(12);

    public String generateAndSaveOtp(String email) {
        UserRegistration user = userRegistrationRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Generate a 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        // Set OTP and expiry
        user.setOtp(otp);
        user.setOtpExpiry(new Date(System.currentTimeMillis() + (5 * 60 * 1000))); // 5 minutes
        userRegistrationRepository.save(user);

        return otp;
    }
    // Validate the OTP
    public boolean validateOtp(String email, String otp) {
        UserRegistration user = userRegistrationRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Check OTP validity
        return user.getOtp() != null && user.getOtp().equals(otp) &&
                user.getOtpExpiry() != null && user.getOtpExpiry().after(new Date());
    }
    // Update the password
    public void updatePassword(String email, String newPassword) {
        UserRegistration user = userRegistrationRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword)); // Hash the password
        user.setOtp(null); // Clear OTP
        user.setOtpExpiry(null); // Clear OTP expiry
        userRegistrationRepository.save(user);
    }


    public void sendOtpEmail(String email, String otp) {
        String subject = "Your OTP for Password Reset- NiceCruises";
        String message = "Your OTP for password reset is: " + otp +
                "\nThis OTP is valid for 5 minutes.";

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }
}
