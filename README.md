# NICE Cruises Management System

NICE Cruises is a full-stack application that allows customers to book cruise trips, manage bookings, and explore entertainment and dining options, while providing admins with tools for managing bookings and analytics.

---

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Frontend Setup](#frontend-setup)
4. [Backend Setup](#backend-setup)
5. [Database Setup](#database-setup)
6. [Features](#features)
7. [API Endpoints](#api-endpoints)


---

## Technologies Used

### Frontend:
- React.js
- Grommet UI Library
- React Router

### Backend:
- Java Spring Boot
- RESTful APIs
- MySQL Database
- Java Persistence API (JPA)

---

## Project Structure

### Frontend
src/ ├── components/ │ ├── AdminDashboard.js │ ├── Booking.js │ ├── ContactSupport.js │ ├── ForgotPassword.js │ ├── Header.js │ ├── PrivateRoute.js │ └── Register.js ├── pages/ │ ├── HomePage.js │ ├── Login.js │ ├── ManageBookings.js │ ├── UserContext.js └── App.js


### Backend
src/main/java/com/example/app/ ├── config/ ├── controller/ │ ├── BookingPageController.java │ ├── PasswordResetController.java │ ├── SidesController.java │ ├── StateRoomController.java │ └── UserController.java ├── dto/ │ ├── BookingDTO.java │ ├── PasswordResetDTO.java │ └── UserRegistrationDTO.java ├── model/ │ ├── Cruise.java │ ├── Entertainment.java │ ├── Invoice.java │ ├── Packages.java │ ├── Passenger.java │ ├── StateRoom.java │ └── Trip.java ├── repository/ │ ├── CruiseRepository.java │ ├── InvoiceRepository.java │ ├── PassengerRepository.java │ ├── StateRoomRepository.java │ └── UserRegistrationRepository.java ├── service/ │ ├── BookingService.java │ ├── EmailService.java │ ├── PassengerService.java │ └── UserService.java └── AppApplication.java


---

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
npm start
3. Start the development server:
  ```bash
   npm start
   ```
4. The frontend will be accessible at http://localhost:3000.


## Backend Setup

1. Ensure you have Java 11+ and Maven installed.
2. Navigate to the backend directory.
3. Configure the MySQL database connection in application.properties:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/nice_cruises
spring.datasource.username=your_username
spring.datasource.password=your_password
```
4. Build and run the application:
```bash
mvn spring-boot:run
```
5. The backend will be accessible at http://localhost:8080.

## Database Setup

1. Install and configure MySQL.
2. Create a database:
```bash
CREATE DATABASE nice_cruises;
```
3. Update the database credentials in application.properties as shown above.
4. Run the Spring Boot application to auto-generate tables using JPA.


## Features

### Customer Features:
• Booking Management: Book cruise trips with options for staterooms, packages, and restaurants.
• Entertainment: View included onboard activities.
• Account Management: Login, register, and reset password.

### Admin Features:
• Manage Bookings: Add or remove bookings and view all customer bookings.
• Analytics: Visualize cruise data using charts for better decision-making.

## API Endpoints

### User Authentication
• POST /api/users/login: Login for customers and admins.
• POST /api/users/register: Register new users.
• POST /api/auth/forgot-password: Request OTP for password reset.
• POST /api/auth/reset-password: Reset password with OTP.

### Booking Management
• GET /api/manage-booking: View customer bookings.
• POST /api/booking: Create a booking.
• DELETE /api/delete-booking: Cancel a booking.

### Admin Analytics
• GET /api/admin/manage-booking: Retrieve all bookings for admin analytics.

Developed with ❤️ by Aashir Saroya








