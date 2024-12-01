import React, { useState } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Select,
  RadioButtonGroup,
  CheckBoxGroup,
  CheckBox,
  Heading,
  TextInput,
  Layer,
  Text,
  DateInput,
} from "grommet";

const Booking = () => {
  const [formData, setFormData] = useState({
    cruise: "",
    sideOfShip: "",
    stateroom: "",
    packages: [],
    passengerDetails: [],
    paymentMethod: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  // const [passengers, setPassengers] = useState([]);
  // const [numAdults, setNumAdults] = useState(0);
  // const [numChildren, setNumChildren] = useState(0);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  // Cruises and Data
  const cruises = [
    {
      name: "Bahamas Escape",
      destinationPort: "Nassau, Bahamas",
      departurePort: "Miami, FL",
    },
    {
      name: "Mexican Riviera",
      destinationPort: "Cozumel, Mexico",
      departurePort: "Galveston, TX",
    },
    {
      name: "Alaskan Wonders",
      destinationPort: "Juneau, AK",
      departurePort: "Seattle, WA",
    },
    {
      name: "Eastern Caribbean Delight",
      destinationPort: "Charlotte Amalie, St. Thomas",
      departurePort: "Port Canaveral, FL",
    },
    {
      name: "Western Caribbean Adventure",
      destinationPort: "George Town, Cayman Islands",
      departurePort: "New Orleans, LA",
    },
    {
      name: "Canadian Rockies Voyage",
      destinationPort: "Vancouver, BC",
      departurePort: "San Francisco, CA",
    },
    {
      name: "Southern Charm Cruise",
      destinationPort: "Key West, FL",
      departurePort: "Tampa, FL",
    },
    {
      name: "Bermuda Bliss",
      destinationPort: "Hamilton, Bermuda",
      departurePort: "New York, NY",
    },
    {
      name: "Gulf of Mexico Escape",
      destinationPort: "Progreso, Mexico",
      departurePort: "Mobile, AL",
    },
    {
      name: "Canadian Maritime Cruise",
      destinationPort: "Halifax, NS",
      departurePort: "Boston, MA",
    },
  ];  

  const staterooms = [
    {
      type: "The Haven Suite",
      size: "1000 sqft",
      beds: 6,
      baths: 3,
      balcony: 2,
    },
    {
      type: "Club Balcony Suite",
      size: "800 sqft",
      beds: 4,
      baths: 2,
      balcony: 2,
    },
    {
      type: "Family Large Balcony",
      size: "600 sqft",
      beds: 4,
      baths: 2,
      balcony: 1,
    },
    {
      type: "Family Balcony",
      size: "400 sqft",
      beds: 4,
      baths: 1.5,
      balcony: 1,
    },
    {
      type: "Oceanview Window",
      size: "300 sqft",
      beds: 2,
      baths: 1,
      balcony: 0,
    },
    {
      type: "Inside Stateroom",
      size: "200 sqft",
      beds: 2,
      baths: 1,
      balcony: 0,
    },
    {
      type: "Studio Stateroom",
      size: "150 sqft",
      beds: 1,
      baths: 1,
      balcony: 0,
    },
  ];
  

  const packages = [
    { name: "Water and Non-Alcoholic", price: 40, description: "$40/person/night for unlimited water and non-alcoholic beverages." },
    { name: "Unlimited Bar", price: 80, description: "$80/person/night for unlimited alcoholic and non-alcoholic drinks (21+ only)." },
    { name: "Internet 200 Minutes", price: 150, description: "200 minutes of internet access, up to 100 GB, for the entire trip." },
    { name: "Unlimited Internet", price: 250, description: "Unlimited internet access for the entire trip." },
    { name: "Specialty Dining", price: 60, description: "$60/person/night for premium dining options (Italian, Japanese, etc.)." },
  ];

  const handleNextPage = () => {
    // Validation for required fields
    if (currentPage === 1 && (!formData.cruise || !formData.sideOfShip)) {
      alert("Please fill out all required fields for the cruise selection.");
      return;
    }
  
    if (currentPage === 2 && !formData.stateroom) {
      alert("Please select a stateroom.");
      return;
    }
  
    if (currentPage === 3) {
      // Validate passenger details
      if (passengers.length === 0) {
        alert("Please add at least one passenger.");
        return;
      }
  
      const incompletePassengers = passengers.some(
        (passenger) =>
          !passenger.firstName ||
          !passenger.lastName ||
          !passenger.dob ||
          !passenger.gender ||
          !passenger.nationality
      );
  
      if (incompletePassengers) {
        alert("Please complete all passenger details.");
        return;
      }
    }
  
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

  const calculateTotal = () => {
    const packageCost = formData.packages.reduce((acc, pkg) => acc + pkg.price, 0);
    const passengerCount = passengers.length;
    return passengerCount * packageCost;
  };

  const confirmBooking = () => {
    console.log("Booking Confirmed: ", JSON.stringify({
      cruise: formData.cruise,
      sideOfShip: formData.sideOfShip,
      stateroom: formData.stateroom,
      packages: formData.packages,
      passengerDetails: passengers,
      paymentMethod: formData.paymentMethod,
      nights: formData.nights || 1,
      tripStartDate: formData.startDate,
      tripEndDate: formData.endDate,
    }, null, 2));
    setIsBookingConfirmed(true);
  };

  const [adultCount, setAdultCount] = useState(0);
const [childCount, setChildCount] = useState(0);
const [passengers, setPassengers] = useState([]);

const generatePassengers = (adults, children) => {
  const groupId = `group-${Date.now()}`;
  const newPassengers = [];
  for (let i = 1; i <= adults; i++) {
    newPassengers.push({ type: "adult", id: i, firstName: "", lastName: "", dob: "", gender: "", nationality: "" });
  }
  for (let i = 1; i <= children; i++) {
    newPassengers.push({ type: "child", id: i, firstName: "", lastName: "", dob: "", gender: "", nationality: "" });
  }
  setPassengers(newPassengers);
};

const updatePassenger = (index, field, value) => {
  const updatedPassengers = [...passengers];
  updatedPassengers[index][field] = value;
  setPassengers(updatedPassengers);
};

const removePassenger = (index) => {
  const updatedPassengers = passengers.filter((_, i) => i !== index);
  setPassengers(updatedPassengers);
};

  return (
    <Box align="center" pad="medium">
      {currentPage === 1 && (
        <Box>
          <Heading level={2}>Select Your Cruise</Heading>
          <FormField label="Choose a Cruise" required>
            <Select
              options={cruises.map((cruise) => cruise.name)}
              value={formData.cruise}
              onChange={({ option }) =>
                setFormData({ ...formData, cruise: option })
              }
            />
          </FormField>
          {formData.cruise && (
            <Box margin={{ top: "medium" }}>
              <Text>
                <strong>Departure Ports:</strong>{" "}
                {
                  cruises.find((cruise) => cruise.name === formData.cruise)
                    .departurePort
                }
              </Text>
              <Text>
                <strong>Destination Ports:</strong>{" "}
                {
                  cruises.find((cruise) => cruise.name === formData.cruise)
                    .destinationPort
                }
              </Text>
            </Box>
          )}
          <FormField label="Choose Side of the Ship" required>
            <RadioButtonGroup
              options={["Bow", "Stern", "Port Side", "Starboard Side"]}
              value={formData.sideOfShip}
              onChange={(event) =>
                setFormData({ ...formData, sideOfShip: event.target.value })
              }
            />
          </FormField>
          <Button label="Next" onClick={handleNextPage} primary />
        </Box>
      )}

{currentPage === 2 && (
  <Box>
    <Heading level={2}>Select Your Stateroom</Heading>
    <FormField label="Choose a Stateroom" required>
      <Select
        options={staterooms.map((room) => room.type)}
        value={formData.stateroom}
        onChange={({ option }) =>
          setFormData({ ...formData, stateroom: option })
        }
      />
    </FormField>
    {formData.stateroom && (
      <Box margin={{ top: "medium" }}>
        <Text>
          <strong>Size:</strong>{" "}
          {
            staterooms.find((room) => room.type === formData.stateroom).size
          }
        </Text>
        <Text>
          <strong>Number of Beds:</strong>{" "}
          {
            staterooms.find((room) => room.type === formData.stateroom).beds
          }
        </Text>
        <Text>
          <strong>Number of Bathrooms:</strong>{" "}
          {
            staterooms.find((room) => room.type === formData.stateroom).baths
          }
        </Text>
        <Text>
          <strong>Number of Balconies:</strong>{" "}
          {
            staterooms.find((room) => room.type === formData.stateroom).balcony
          }
        </Text>
      </Box>
    )}
    <Heading level={3}>Choose Packages</Heading>
    {packages.map((pkg) => (
      <Box key={pkg.name} margin={{ bottom: "small" }}>
        <CheckBox
          label={
            <Box>
              <Text>
                <strong>{pkg.name}</strong> — ${pkg.price}
              </Text>
              {pkg.description && <Text size="small">{pkg.description}</Text>}
            </Box>
          }
          checked={formData.packages.some((selectedPkg) => selectedPkg.name === pkg.name)}
          onChange={(event) => {
            const updatedPackages = event.target.checked
              ? [...formData.packages, pkg]
              : formData.packages.filter((selectedPkg) => selectedPkg.name !== pkg.name);
            setFormData({ ...formData, packages: updatedPackages });
          }}
        />
      </Box>
    ))}
    <Box direction="row" justify="between" margin={{ top: "medium" }}>
      <Button label="Back" onClick={handlePreviousPage} />
      <Button label="Next" onClick={handleNextPage} primary />
    </Box>
  </Box>
)}


{currentPage === 3 && (
  <Box>
    <Heading level={2}>Passenger Details</Heading>

    {/* Trip Dates Section */}
    <Box margin={{ bottom: "medium" }}>
      <FormField label="Trip Start Date" required>
        <DateInput
          format="mm/dd/yyyy"
          value={formData.startDate}
          onChange={({ value }) => {
            setFormData((prev) => ({
              ...prev,
              startDate: value,
              nights: prev.endDate
                ? Math.max(
                    Math.ceil(
                      (new Date(prev.endDate) - new Date(value)) /
                        (1000 * 60 * 60 * 24)
                    ),
                    1
                  )
                : prev.nights || 1,
            }));
          }}
          min={new Date().toISOString().split("T")[0]}
        />
      </FormField>
      <FormField label="Trip End Date" required>
        <DateInput
          format="mm/dd/yyyy"
          value={formData.endDate}
          onChange={({ value }) => {
            setFormData((prev) => ({
              ...prev,
              endDate: value,
              nights: prev.startDate
                ? Math.max(
                    Math.ceil(
                      (new Date(value) - new Date(prev.startDate)) /
                        (1000 * 60 * 60 * 24)
                    ),
                    1
                  )
                : prev.nights || 1,
            }));
          }}
        />
      </FormField>
      <Box direction="row" align="center" gap="small">
        <Text>Number of Nights:</Text>
        <Text weight="bold">{formData.nights || 1}</Text>
      </Box>
    </Box>

    {/* Counter Section for Adults and Children */}
    <Box direction="row" gap="large" align="center" margin={{ bottom: "medium" }}>
      <Box>
        <Text>Number of Adults:</Text>
        <Box direction="row" gap="small" align="center">
          <Button
            label="-"
            onClick={() => setAdultCount((prev) => Math.max(prev - 1, 0))}
          />
          <Text>{adultCount}</Text>
          <Button
            label="+"
            onClick={() => setAdultCount((prev) => prev + 1)}
          />
        </Box>
      </Box>

      <Box>
        <Text>Number of Children:</Text>
        <Box direction="row" gap="small" align="center">
          <Button
            label="-"
            onClick={() => setChildCount((prev) => Math.max(prev - 1, 0))}
          />
          <Text>{childCount}</Text>
          <Button
            label="+"
            onClick={() => setChildCount((prev) => prev + 1)}
          />
        </Box>
      </Box>

      <Button
        label="Confirm"
        onClick={() => {
          if (childCount > 0 && adultCount === 0) {
            alert("Children cannot travel alone. Please add at least one adult.");
            return;
          }
          generatePassengers(adultCount, childCount);
        }}
        primary
      />
    </Box>

    {/* Passenger Details Section */}
    <Box wrap direction="row" gap="large">
      {passengers.map((passenger, index) => (
        <Box
          key={index}
          border={{ color: "light-4", side: "all" }}
          pad="medium"
          width="medium"
        >
          <Text weight="bold" size="medium">
            {passenger.type === "adult" ? `Adult ${passenger.id}` : `Child ${passenger.id}`}
          </Text>
          <FormField label="First Name" required>
            <TextInput
              value={passenger.firstName}
              onChange={(e) =>
                updatePassenger(index, "firstName", e.target.value)
              }
            />
          </FormField>
          <FormField label="Last Name" required>
            <TextInput
              value={passenger.lastName}
              onChange={(e) =>
                updatePassenger(index, "lastName", e.target.value)
              }
            />
          </FormField>
          <FormField label="Date of Birth" required>
            <DateInput
              format="mm/dd/yyyy"
              value={passenger.dob}
              onChange={({ value }) => {
                const currentYear = new Date().getFullYear();
                const birthYear = new Date(value).getFullYear();
                const age = currentYear - birthYear;

                if (passenger.type === "child" && age > 18) {
                  alert("A child cannot be older than 18 years. Please select a valid date.");
                  return;
                }

                if (passenger.type === "adult" && age <= 18) {
                  alert("An adult must be older than 18 years. Please select a valid date.");
                  return;
                }

                updatePassenger(index, "dob", value);
              }}
            />
          </FormField>
          <FormField label="Gender" required>
            <Select
              options={["Male", "Female", "Other"]}
              value={passenger.gender}
              onChange={({ option }) =>
                updatePassenger(index, "gender", option)
              }
            />
          </FormField>
          <FormField label="Nationality" required>
            <TextInput
              value={passenger.nationality}
              onChange={(e) =>
                updatePassenger(index, "nationality", e.target.value)
              }
            />
          </FormField>
          <Button
            label="Remove Passenger"
            onClick={() => removePassenger(index)}
            color="status-critical"
          />
        </Box>
      ))}
    </Box>

    <Box direction="row" justify="between" margin={{ top: "medium" }}>
      <Button label="Back" onClick={handlePreviousPage} />
      <Button
        label="Next"
        onClick={() => {
          if (childCount > 0 && adultCount === 0) {
            alert("Children cannot travel alone. Please add at least one adult.");
            return;
          }
          handleNextPage();
        }}
        primary
      />
    </Box>
  </Box>
)}

      {currentPage === 4 && (
        <Box>
          <Heading level={2}>Review and Confirm</Heading>
          <Text>
            <strong>Cruise:</strong> {formData.cruise}
          </Text>
          <Text>
            <strong>Stateroom:</strong> {formData.stateroom}
          </Text>
          <Text>
            <strong>Packages:</strong>{" "}
            {formData.packages.map((pkg) => pkg.name).join(", ")}
          </Text>
          <Text>
            <strong>Passengers:</strong>
          </Text>
          {passengers.map((p, i) => (
            <Text key={i}>
              {p.type}: {p.firstName} {p.lastName}, {p.gender}, {p.nationality}
            </Text>
          ))}
          <Text>
            <strong>Total Price:</strong> ${calculateTotal()}
          </Text>
          <FormField label="Payment Method" required>
            <Select
              options={["Cash", "Card"]}
              value={formData.paymentMethod}
              onChange={({ option }) =>
                setFormData({ ...formData, paymentMethod: option })
              }
            />
          </FormField>
          <Button
            label="Confirm Booking"
            onClick={confirmBooking}
            primary
            margin={{ top: "medium" }}
          />
        </Box>
      )}

      {isBookingConfirmed && (
        <Layer
          onEsc={() => setIsBookingConfirmed(false)}
          onClickOutside={() => setIsBookingConfirmed(false)}
        >
          <Box pad="medium" gap="small" round="large">
            <Text>Your booking has been confirmed!</Text>
            <Text>
              <strong>Total Amount:</strong> ${calculateTotal()}
            </Text>
            <Button
              label="Close"
              onClick={() => setIsBookingConfirmed(false)}
              primary
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default Booking;
