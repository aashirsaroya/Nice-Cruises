package com.cruise.app.service;

import com.cruise.app.model.UserRegistration;
import com.cruise.app.repository.UserRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;


@Service
public class UserService {
    private BCryptPasswordEncoder passwordEncoder =new BCryptPasswordEncoder(12);
    @Autowired
    private UserRegistrationRepository userRegistrationRepository;

    public void validateAndRegisterUser(UserRegistration userRegistration) {

        if (!isValidEmail(userRegistration.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid email format");
        }

        if (isEmailTaken(userRegistration.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"email already in use");
        }
        if (!isValidPhoneNumber(userRegistration.getPhone())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Phone number must be exactly 10 digits");
        }
        registerUser(userRegistration);
    }
    public Map<String,Object> userAddress(String email) {
        Map<String,Object> addressInfo = new HashMap<>();
        Optional<UserRegistration> userOptional = userRegistrationRepository.findByEmail(email);
        UserRegistration user = userOptional.get();

        addressInfo.put("street1",user.getStreetLine1());
        addressInfo.put("city", user.getCity());
        addressInfo.put("state", user.getState());
        addressInfo.put("country", user.getCountry());
        addressInfo.put("zip", user.getZipCode());
        addressInfo.put("phone",user.getPhone());
        return addressInfo;
    }

    public String validateUserCredentials(String email, String password, boolean isAdmin) {
        if (isEmailTaken(email)) {
            Optional<UserRegistration> userOptional = userRegistrationRepository.findByEmail(email);
            UserRegistration user = userOptional.get();
            boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
            if(passwordMatches == true ) {
                if(user.getIsAdmin() == true) {
                    return "login success and is admin";
                } else {
                    return "login success and is not admin";
                }
            }
            return "incorrect login";
        }
        return "email Taken already";
    }

    public void registerUser(UserRegistration userRegistration) {
        String encryptedPassword = passwordEncoder.encode(userRegistration.getPassword());
        userRegistration.setPassword(encryptedPassword);
        userRegistrationRepository.save(userRegistration);
    }


    public boolean isEmailTaken(String email) {
        return userRegistrationRepository.existsByEmail(email);
    }
    public boolean isValidEmail(String email) {
        return Pattern.matches( "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",email);
    }
    public boolean isValidPhoneNumber(Long phoneNumber) {
        return Pattern.matches("\\d{10}",phoneNumber.toString());
    }
}
