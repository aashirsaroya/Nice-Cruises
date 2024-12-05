import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormField,
  Select,
  RadioButtonGroup,
  CheckBox,
  Heading,
  TextInput,
  Layer,
  Text,
  DateInput,
  CheckBoxGroup,
} from "grommet";
import { useUser } from "./UserContext";

const Booking = () => {
  const [formData, setFormData] = useState({
    cruise: "",
    sideOfShip: "",
    stateroom: "",
    packages: [],
    passengerDetails: [],
    paymentMethod: "",
    selectedRestaurants: [],
    startDate: "",
    endDate: "",
    nights: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [passengers, setPassengers] = useState([]);

  // Cruises and Data
  const cruises = [
    {
      name: "Bahamas Escape",
      destinationPort: "Nassau, Bahamas",
      departurePort: "Miami, FL",
      basePricePerNight: 100,
    },
    {
      name: "Mexican Riviera",
      destinationPort: "Cozumel, Mexico",
      departurePort: "Galveston, TX",
      basePricePerNight: 120,
    },
    {
      name: "Alaskan Wonders",
      destinationPort: "Juneau, AK",
      departurePort: "Seattle, WA",
      basePricePerNight: 150,
    },
    {
      name: "Eastern Caribbean Delight",
      destinationPort: "Charlotte Amalie, St. Thomas",
      departurePort: "Port Canaveral, FL",
      basePricePerNight: 110,
    },
    {
      name: "Western Caribbean Adventure",
      destinationPort: "George Town, Cayman Islands",
      departurePort: "New Orleans, LA",
      basePricePerNight: 115,
    },
    {
      name: "Canadian Rockies Voyage",
      destinationPort: "Vancouver, BC",
      departurePort: "San Francisco, CA",
      basePricePerNight: 130,
    },
    {
      name: "Southern Charm Cruise",
      destinationPort: "Key West, FL",
      departurePort: "Tampa, FL",
      basePricePerNight: 105,
    },
    {
      name: "Bermuda Bliss",
      destinationPort: "Hamilton, Bermuda",
      departurePort: "New York, NY",
      basePricePerNight: 125,
    },
    {
      name: "Gulf of Mexico Escape",
      destinationPort: "Progreso, Mexico",
      departurePort: "Mobile, AL",
      basePricePerNight: 110,
    },
    {
      name: "Canadian Maritime Cruise",
      destinationPort: "Halifax, NS",
      departurePort: "Boston, MA",
      basePricePerNight: 120,
    },
  ];

  const staterooms = [
    {
      type: "The Haven Suite",
      size: "1000 sqft",
      beds: 6,
      baths: 3,
      balcony: 2,
      basePricePerNight: 500,
    },
    {
      type: "Club Balcony Suite",
      size: "800 sqft",
      beds: 4,
      baths: 2,
      balcony: 2,
      basePricePerNight: 400,
    },
    {
      type: "Family Large Balcony",
      size: "600 sqft",
      beds: 4,
      baths: 2,
      balcony: 1,
      basePricePerNight: 350,
    },
    {
      type: "Family Balcony",
      size: "400 sqft",
      beds: 4,
      baths: 1.5,
      balcony: 1,
      basePricePerNight: 300,
    },
    {
      type: "Oceanview Window",
      size: "300 sqft",
      beds: 2,
      baths: 1,
      balcony: 0,
      basePricePerNight: 250,
    },
    {
      type: "Inside Stateroom",
      size: "200 sqft",
      beds: 2,
      baths: 1,
      balcony: 0,
      basePricePerNight: 200,
    },
    {
      type: "Studio Stateroom",
      size: "150 sqft",
      beds: 1,
      baths: 1,
      balcony: 0,
      basePricePerNight: 150,
    },
  ];

  const packages = [
    {
      name: "Water and Non-Alcoholic",
      price: 40,
      description: "$40/person/night for unlimited water and non-alcoholic beverages.",
    },
    {
      name: "Unlimited Bar",
      price: 80,
      description: "$80/person/night for unlimited alcoholic and non-alcoholic drinks (21+ only).",
    },
    {
      name: "Internet 200 Minutes",
      price: 150,
      description: "200 minutes of internet access, up to 100 GB, for the entire trip.",
    },
    {
      name: "Unlimited Internet",
      price: 250,
      description: "Unlimited internet access for the entire trip.",
    },
    {
      name: "Specialty Dining",
      price: 60,
      description: "$60/person/night for premium dining options (Italian, Japanese, etc.).",
    },
  ];

  const locationMultipliers = {
    "Bow": 1.0,
    "Stern": 1.1,
    "Port Side": 1.2,
    "Starboard Side": 1.3,
  };

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

    if (currentPage === 4 && formData.selectedRestaurants?.length !== 2) {
      alert("Please select exactly two restaurants before proceeding.");
      return;
    }

    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

  const calculateAge = (dob, startDate) => {
    const birthDate = new Date(dob);
    const tripStartDate = new Date(startDate);
    let age = tripStartDate.getFullYear() - birthDate.getFullYear();
    const m = tripStartDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && tripStartDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateCruiseCost = () => {
    const cruise = cruises.find((c) => c.name === formData.cruise);
    const cruiseCostPerNight = cruise.basePricePerNight;
    const totalCruiseCost = cruiseCostPerNight * formData.nights;
    return totalCruiseCost;
  };

  const calculateStateroomCost = () => {
    const stateroom = staterooms.find((room) => room.type === formData.stateroom);
    const basePrice = stateroom.basePricePerNight;
    const multiplier = locationMultipliers[formData.sideOfShip];
    const adjustedPricePerNight = basePrice * multiplier;
    const totalStateroomCost = adjustedPricePerNight * formData.nights;
    return totalStateroomCost;
  };

  const calculatePerPersonPackageCosts = () => {
    const perPersonPackages = ["Water and Non-Alcoholic", "Specialty Dining", "Unlimited Bar"];

    const eligiblePassengers = passengers.filter((passenger) => {
      const age = calculateAge(passenger.dob, formData.startDate);
      return age >= 5;
    });

    let total = 0;

    eligiblePassengers.forEach((passenger) => {
      formData.packages.forEach((pkg) => {
        if (perPersonPackages.includes(pkg.name)) {
          if (pkg.name === "Unlimited Bar") {
            const age = calculateAge(passenger.dob, formData.startDate);
            if (age >= 21) {
              total += pkg.price * formData.nights;
            }
          } else {
            total += pkg.price * formData.nights;
          }
        }
      });
    });

    return total;
  };

  const calculatePerCabinPackageCosts = () => {
    const perCabinPackages = ["Internet 200 Minutes", "Unlimited Internet"];
    const selectedPerCabinPackages = formData.packages.filter((pkg) =>
      perCabinPackages.includes(pkg.name)
    );
    return selectedPerCabinPackages.reduce((acc, pkg) => acc + pkg.price, 0);
  };

  const calculateTotal = () => {
    const cruiseCost = calculateCruiseCost();
    const stateroomCost = calculateStateroomCost();
    const perPersonPackageCosts = calculatePerPersonPackageCosts();
    const perCabinPackageCosts = calculatePerCabinPackageCosts();

    return cruiseCost + stateroomCost + perPersonPackageCosts + perCabinPackageCosts;
  };

  const [groupId, setGroupId] = useState("");

  useEffect(() => {
    setGroupId(`group-${Date.now()}`);
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, passengerDetails: passengers }));
  }, [passengers]);

  const { user } = useUser();

  const updatedFormData = {
    ...formData,
    passengerDetails: passengers,
  };

  const confirmBooking = () => {
    const cruiseData = cruises.find((cruise) => cruise.name === formData.cruise);

    console.log(
      "Booking Confirmed: ",
      JSON.stringify(
        {
          groupId: groupId,
          currentDate: new Date().toLocaleString(),
          email: user?.email,
          cruise: updatedFormData.cruise,
          departurePort: "Port of " + cruiseData?.departurePort,
          destinationPort: "Port of " + cruiseData?.destinationPort,
          sideOfShip: updatedFormData.sideOfShip,
          stateroom: updatedFormData.stateroom,
          selectedRestaurants: updatedFormData.selectedRestaurants,
          packages: updatedFormData.packages,
          passengerDetails: updatedFormData.passengerDetails,
          startDate: updatedFormData.startDate,
          endDate: updatedFormData.endDate,
          nights: updatedFormData.nights,
          paymentMethod: updatedFormData.paymentMethod,
        },
        null,
        2
      )
    );
    setIsBookingConfirmed(true);
  };

  const generatePassengers = (adults, children) => {
    const newPassengers = [];
    for (let i = 1; i <= adults; i++) {
      newPassengers.push({
        type: "adult",
        id: i,
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        nationality: "",
      });
    }
    for (let i = 1; i <= children; i++) {
      newPassengers.push({
        type: "child",
        id: i,
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        nationality: "",
      });
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

  // Additional variables for invoice breakdown
  const cruise = cruises.find((c) => c.name === formData.cruise);
  const cruiseCostPerNight = cruise ? cruise.basePricePerNight : 0;
  const totalCruiseCost = cruiseCostPerNight * formData.nights;

  const stateroom = staterooms.find((room) => room.type === formData.stateroom);
  const basePrice = stateroom ? stateroom.basePricePerNight : 0;
  const multiplier = locationMultipliers[formData.sideOfShip] || 0;
  const adjustedPricePerNight = basePrice * multiplier;
  const totalStateroomCost = adjustedPricePerNight * formData.nights;

  const perPersonPackageDetails = [];
  const perPersonPackages = ["Water and Non-Alcoholic", "Specialty Dining", "Unlimited Bar"];

  const eligiblePassengers = passengers.filter((passenger) => {
    const age = calculateAge(passenger.dob, formData.startDate);
    return age >= 5;
  });

  eligiblePassengers.forEach((passenger) => {
    formData.packages.forEach((pkg) => {
      if (perPersonPackages.includes(pkg.name)) {
        if (pkg.name === "Unlimited Bar") {
          const age = calculateAge(passenger.dob, formData.startDate);
          if (age >= 21) {
            perPersonPackageDetails.push({
              passengerName: `${passenger.firstName} ${passenger.lastName}`,
              packageName: pkg.name,
              cost: pkg.price * formData.nights,
            });
          }
        } else {
          perPersonPackageDetails.push({
            passengerName: `${passenger.firstName} ${passenger.lastName}`,
            packageName: pkg.name,
            cost: pkg.price * formData.nights,
          });
        }
      }
    });
  });

  const perCabinPackages = ["Internet 200 Minutes", "Unlimited Internet"];
  const perCabinPackageDetails = formData.packages
    .filter((pkg) => perCabinPackages.includes(pkg.name))
    .map((pkg) => ({
      packageName: pkg.name,
      cost: pkg.price,
    }));

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
                <strong>Departure Port:</strong>{" "}
                {cruises.find((c) => c.name === formData.cruise)?.departurePort}
              </Text>
              <Text>
                <strong>Destination Port:</strong>{" "}
                {cruises.find((c) => c.name === formData.cruise)?.destinationPort}
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
                  staterooms.find((room) => room.type === formData.stateroom)
                    .size
                }
              </Text>
              <Text>
                <strong>Number of Beds:</strong>{" "}
                {
                  staterooms.find((room) => room.type === formData.stateroom)
                    .beds
                }
              </Text>
              <Text>
                <strong>Number of Bathrooms:</strong>{" "}
                {
                  staterooms.find((room) => room.type === formData.stateroom)
                    .baths
                }
              </Text>
              <Text>
                <strong>Number of Balconies:</strong>{" "}
                {
                  staterooms.find((room) => room.type === formData.stateroom)
                    .balcony
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
                    {pkg.description && (
                      <Text size="small">{pkg.description}</Text>
                    )}
                  </Box>
                }
                checked={formData.packages.some(
                  (selectedPkg) => selectedPkg.name === pkg.name
                )}
                onChange={(event) => {
                  const updatedPackages = event.target.checked
                    ? [...formData.packages, pkg]
                    : formData.packages.filter(
                        (selectedPkg) => selectedPkg.name !== pkg.name
                      );
                  setFormData({ ...formData, packages: updatedPackages });
                }}
              />
            </Box>
          ))}
          <Box
            direction="row"
            justify="between"
            margin={{ top: "medium" }}
          >
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
          <Box
            direction="row"
            gap="large"
            align="center"
            margin={{ bottom: "medium" }}
          >
            <Box>
              <Text>Number of Adults:</Text>
              <Box direction="row" gap="small" align="center">
                <Button
                  label="-"
                  onClick={() =>
                    setAdultCount((prev) => Math.max(prev - 1, 0))
                  }
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
                  onClick={() =>
                    setChildCount((prev) => Math.max(prev - 1, 0))
                  }
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
                  alert(
                    "Children cannot travel alone. Please add at least one adult."
                  );
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
                  {passenger.type === "adult"
                    ? `Adult ${passenger.id}`
                    : `Child ${passenger.id}`}
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
                        alert(
                          "A child cannot be older than 18 years. Please select a valid date."
                        );
                        return;
                      }

                      if (passenger.type === "adult" && age <= 18) {
                        alert(
                          "An adult must be older than 18 years. Please select a valid date."
                        );
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

          <Box
            direction="row"
            justify="between"
            margin={{ top: "medium" }}
          >
            <Button label="Back" onClick={handlePreviousPage} />
            <Button
              label="Next"
              onClick={() => {
                if (childCount > 0 && adultCount === 0) {
                  alert(
                    "Children cannot travel alone. Please add at least one adult."
                  );
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
          <Heading level={2}>Entertainment Options</Heading>
          <Text>All the below entertainment options are included for free:</Text>
          <Box margin={{ top: "medium", bottom: "medium" }}>
            <ul>
              <li>Theaters (2 units on 8th and 10th floors)</li>
              <li>Casino (1 unit on the 7th floor)</li>
              <li>Library (2 units on 3rd and 4th floors)</li>
              <li>Children Play Area (1 unit on 3rd floor)</li>
              <li>Gym (1 unit on the 5th floor)</li>
              <li>Outdoor Pool (1 unit on the 11th floor)</li>
              <li>Indoor Pool (1 unit on the 9th floor)</li>
              <li>Whirlpool (2 units on 9th and 11th floors)</li>
              <li>Steam Room (1 unit on the 9th floor)</li>
              <li>Sauna Room (1 unit on the 9th floor)</li>
              <li>Yoga Room (1 unit on the 5th floor)</li>
              <li>Night Club (2 units on 8th and 11th floors)</li>
              <li>Tennis Court (1 unit on the 11th floor)</li>
            </ul>
          </Box>

          <Heading level={2}>Select Two Restaurants</Heading>
          <Text>Please select exactly two restaurants from the list below:</Text>
          <FormField>
            <CheckBoxGroup
              options={[
                "Common Buffet (6th Floor)",
                "Italian Specialty (8th Floor)",
                "Mexican Specialty (7th Floor)",
                "La-carte Continental (6th Floor)",
                "Tokyo Ramen Japanese (5th Floor)",
                "Ming Wok Chinese (5th Floor)",
                "Round Clock Café (10th Floor)",
                "Pool Bar (10th Floor)",
                "Stout Bar (7th Floor)",
              ]}
              value={formData.selectedRestaurants || []}
              onChange={({ value }) =>
                setFormData({ ...formData, selectedRestaurants: value })
              }
            />
          </FormField>
          {formData.selectedRestaurants?.length !== 2 && (
            <Text color="status-critical">
              You must select exactly two restaurants.
            </Text>
          )}
          <Box
            direction="row"
            justify="between"
            margin={{ top: "medium" }}
          >
            <Button label="Back" onClick={handlePreviousPage} />
            <Button
              label="Next"
              onClick={() => {
                if (formData.selectedRestaurants?.length !== 2) {
                  alert(
                    "Please select exactly two restaurants before proceeding."
                  );
                  return;
                }
                handleNextPage();
              }}
              primary
            />
          </Box>
        </Box>
      )}

      {currentPage === 5 && (
        <Box>
          <Heading level={2}>Review and Confirm</Heading>

          <Heading level={3}>Invoice Breakdown</Heading>
          <Box margin={{ bottom: "medium" }}>
            <Text>
              <strong>Cruise Cost:</strong> ${totalCruiseCost.toFixed(2)}
            </Text>
            <Text>
              <strong>Stateroom Cost:</strong> ${totalStateroomCost.toFixed(2)}
            </Text>
            <Box margin={{ left: "medium" }}>
              <Text>Base Price per Night: ${basePrice.toFixed(2)}</Text>
              <Text>Location Multiplier: x{multiplier}</Text>
              <Text>
                Adjusted Price per Night: ${adjustedPricePerNight.toFixed(2)}
              </Text>
              <Text>
                Total Stateroom Cost: ${totalStateroomCost.toFixed(2)}
              </Text>
            </Box>
            <Text>
              <strong>Packages:</strong>
            </Text>
            <Box margin={{ left: "medium" }}>
              <Text>
                <strong>Per-Person Package Costs:</strong>
              </Text>
              {perPersonPackageDetails.map((detail, index) => (
                <Text key={index}>
                  {detail.passengerName}: {detail.packageName} - $
                  {detail.cost.toFixed(2)}
                </Text>
              ))}
              <Text>
                <strong>Total Per-Person Package Costs:</strong> $
                {calculatePerPersonPackageCosts().toFixed(2)}
              </Text>

              <Text>
                <strong>Per-Cabin Package Costs:</strong>
              </Text>
              {perCabinPackageDetails.map((detail, index) => (
                <Text key={index}>
                  {detail.packageName} - ${detail.cost.toFixed(2)}
                </Text>
              ))}
              <Text>
                <strong>Total Per-Cabin Package Costs:</strong> $
                {calculatePerCabinPackageCosts().toFixed(2)}
              </Text>
            </Box>
            <Text>
              <strong>Total Amount Due:</strong> ${calculateTotal().toFixed(2)}
            </Text>
          </Box>

          <Text>
            <strong>Cruise:</strong> {formData.cruise}
          </Text>
          <Text>
            <strong>Stateroom:</strong> {formData.stateroom}
          </Text>
          <Text>
            <strong>Side of Ship:</strong> {formData.sideOfShip}
          </Text>
          <Text>
            <strong>Packages Selected:</strong>{" "}
            {formData.packages.map((pkg) => pkg.name).join(", ")}
          </Text>
          <Text>
            <strong>Selected Restaurants:</strong>{" "}
            {formData.selectedRestaurants?.join(", ")}
          </Text>
          <Text>
            <strong>Passengers:</strong>
          </Text>
          {passengers.map((p, i) => (
            <Text key={i}>
              {p.type}: {p.firstName} {p.lastName}, {p.gender},{" "}
              {p.nationality}
            </Text>
          ))}

          <FormField label="Payment Method" required>
            <Select
              options={["Cash", "Card"]}
              value={formData.paymentMethod}
              onChange={({ option }) =>
                setFormData({ ...formData, paymentMethod: option })
              }
            />
          </FormField>
          <Box
            direction="row"
            justify="between"
            margin={{ top: "medium" }}
          >
            <Button label="Back" onClick={handlePreviousPage} />
            <Button
              label="Confirm Booking"
              onClick={confirmBooking}
              primary
            />
          </Box>
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
              <strong>Total Amount:</strong> ${calculateTotal().toFixed(2)}
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
