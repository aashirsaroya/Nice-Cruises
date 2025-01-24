package com.cruise.app.controller;

import com.cruise.app.dto.UserRegistrationDTO;
import com.cruise.app.model.UserRegistration;
import com.cruise.app.repository.UserRegistrationRepository;
import com.cruise.app.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.xml.bind.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
//@CrossOrigin(origins = "*")


public class UserController {
//    @Autowired
//    private UserRegistration userRegistration;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRegistrationRepository userRegistrationRepository;
    // Endpoint to handle user registration

//    @GetMapping("/{username}/address")
//    public ResponseEntity<?> getUserAddress(@PathVariable String username) {
//        try {
//
//            Optional<UserRegistration> userOptional = userRegistrationRepository.findByName(username);
//            UserRegistration user = userOptional.get();
//            System.out.println("hello "+user);
//            return ResponseEntity.status(HttpStatus.OK).body("User address: " + user.toString());
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error occurred while fetching user address: " + e.getMessage());
//        }
//    }
@PostMapping("/admin/register")
public ResponseEntity<String> registerAdmin(@RequestBody UserRegistrationDTO userRegistrationDTO) {
    try {
        UserRegistration userRegistration =new UserRegistration();
        userRegistration.setIsAdmin(true);
        userRegistration.setPassword(userRegistrationDTO.getPassword());
        userRegistration.setFirstName(userRegistrationDTO.getFirstName());
        userRegistration.setLastName(userRegistrationDTO.getLastName());
        userRegistration.setEmail(userRegistrationDTO.getEmail());
        userRegistration.setStreetLine1("38 stagg street");
        userRegistration.setStreetLine2("test");
        userRegistration.setCity("Jersey");
        userRegistration.setState("NJ");
        userRegistration.setCountry("United States");
        userRegistration.setZipCode(73050L);
        userRegistration.setPhone(7893139934L);

        userService.validateAndRegisterUser(userRegistration);
        return ResponseEntity.status(HttpStatus.CREATED).body("Admin registered successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error occurred while registering Admin: " + e.getMessage());
    }
}
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistration userRegistration) {
        try {

            userService.validateAndRegisterUser(userRegistration);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error occurred while registering user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserRegistration userRegistration) {
        try {
            Map<String, Object> response = new HashMap<>();

            String loginSuccess = userService.validateUserCredentials(userRegistration.getEmail(), userRegistration.getPassword(), false);
            if (loginSuccess.equals("login success and is admin")) {
                response.put("isAdmin", true);
            } else if(loginSuccess.equals("login success and is not admin")) {
                response.put("isAdmin", false);
            }
            else if(loginSuccess.equals("incorrect login")){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email or password");
            }
            else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid email or password");
            }
            // Convert Map to JSON string
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonResponse = objectMapper.writeValueAsString(response);
                return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating JSON response");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error occurred while logging in: " + e.getMessage());
        }
    }
}

