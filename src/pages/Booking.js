import React, { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Select,
  RadioButtonGroup,
  CheckBoxGroup,
  Heading,
  TextInput,
  TextArea,
} from 'grommet';

const Booking = () => {
  const [formData, setFormData] = useState({
    cruise: '',
    stateroom: '',
    sideOfShip: '',
    entertainment: [],
    diningOption: '',
    packages: [],
    nights: '',
    startPort: '',
    endPort: '',
    itinerary: '',
    paymentMethod: '',
  });

  const [passengerDetails, setPassengerDetails] = useState({
    adults: [{ name: '', age: '', gender: '', email: '', phone: '' }],
    children: [],
  });
  //GPT Generated, not sure of this
  const calculateTotal = () => {
    const basePricePerNight = 100; // Example base price per night
    const packageCost = formData.packages.length * 50; // Example package cost
    const adultsCost = passengerDetails.adults.length * basePricePerNight;
    const childrenCost =
      passengerDetails.children.length * basePricePerNight * 0.5; // Half price for children

    return (
      (Number(formData.nights) || 0) * (adultsCost + childrenCost) + packageCost
    );
  };

  const addPassenger = (type) => {
    setPassengerDetails((prevState) => ({
      ...prevState,
      [type]: [
        ...prevState[type],
        { name: '', age: '', gender: '', email: '', phone: '' },
      ],
    }));
  };

  const deletePassenger = (type, index) => {
    setPassengerDetails((prevState) => ({
      ...prevState,
      [type]: prevState[type].filter((_, i) => i !== index),
    }));
  };

  const handlePassengerChange = (type, index, field, value) => {
    const updatedPassengers = [...passengerDetails[type]];
    updatedPassengers[index][field] = value;
    setPassengerDetails((prevState) => ({
      ...prevState,
      [type]: updatedPassengers,
    }));
  };

  const handleBooking = () => {
    const totalAmount = calculateTotal();
    console.log('Booking Details:', { ...formData, totalAmount, passengerDetails });
    // Srinath API Call
  };

  return (
    <Box
      fill
      align="center"
      justify="center"
      pad="medium"
      style={{
        position: 'relative',
        backgroundImage: 'url(/login-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: -1,
        }}
      />
      <Box
        width="80%"
        height="90vh"
        pad="medium"
        background="white"
        round="small"
        elevation="large"
        style={{
          overflowY: 'auto',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Heading level={1} alignSelf="center">
          Book Your Cruise
        </Heading>
        <Heading level={3} margin={{ bottom: 'medium' }} alignSelf="center">
          Customize your cruise experience
        </Heading>
        <Form
          value={formData}
          onChange={(nextValue) => setFormData(nextValue)}
          onSubmit={handleBooking}
        >
          
          <Box direction="row" gap="large">
            <FormField label="Select a Cruise" required>
              <Select
                options={[
                  'Caribbean Getaway',
                  'Mediterranean Adventure',
                  'Alaskan Voyage',
                ]}
                value={formData.cruise}
                onChange={({ option }) =>
                  setFormData({ ...formData, cruise: option })
                }
                placeholder="Choose a cruise"
              />
            </FormField>
            <FormField label="Select a Stateroom" required>
              <Select
                options={[
                  'The Haven Suite - Luxurious and spacious',
                  'Club Balcony Suite - Cozy and premium',
                  'Family Balcony - Perfect for families',
                  'Oceanview Window - Scenic and affordable',
                  'Inside Stateroom - Budget-friendly',
                  'Studio Stateroom - Great for solo travelers',
                ]}
                value={formData.stateroom}
                onChange={({ option }) =>
                  setFormData({ ...formData, stateroom: option })
                }
                placeholder="Choose a stateroom"
              />
            </FormField>
          </Box>

          <FormField label="Select Side of the Ship" required>
            <RadioButtonGroup
              name="sideOfShip"
              options={[
                'Bow (Forward)',
                'Stern (Aft)',
                'Port Side (Left)',
                'Starboard Side (Right)',
              ]}
              value={formData.sideOfShip}
              onChange={(event) =>
                setFormData({ ...formData, sideOfShip: event.target.value })
              }
            />
          </FormField>

         
          <Box direction="row" gap="large">
            <FormField label="Entertainment Options">
              <CheckBoxGroup
                options={[
                  'Theaters',
                  'Casino',
                  'Library',
                  'Children\'s Play Area',
                  'Gym',
                  'Outdoor Pool',
                  'Indoor Pool',
                  'Whirlpool',
                  'Steam Room',
                  'Yoga Room',
                ]}
                value={formData.entertainment}
                onChange={({ value }) =>
                  setFormData({ ...formData, entertainment: value })
                }
              />
            </FormField>
            <FormField label="Dining Options">
              <Select
                options={[
                  'Buffet - Open 24/7',
                  'Italian Specialty',
                  'Mexican Fiesta',
                  'Chinese Delights',
                ]}
                value={formData.diningOption}
                onChange={({ option }) =>
                  setFormData({ ...formData, diningOption: option })
                }
                placeholder="Choose a dining option"
              />
            </FormField>
          </Box>

        
          <Heading level={4}>Passenger Details</Heading>
          <Box>
            <Heading level={5}>Adults</Heading>
            {passengerDetails.adults.map((adult, index) => (
              <Box key={index} margin={{ bottom: 'small' }} border round>
                <Heading level={6}>Adult {index + 1}</Heading>
                <Box direction="row" gap="small">
                  <FormField label="Name" required>
                    <TextInput
                      placeholder="Enter name"
                      value={adult.name}
                      onChange={(e) =>
                        handlePassengerChange('adults', index, 'name', e.target.value)
                      }
                    />
                  </FormField>
                  <FormField label="Age" required>
                    <TextInput
                      placeholder="Enter age"
                      value={adult.age}
                      onChange={(e) =>
                        handlePassengerChange('adults', index, 'age', e.target.value)
                      }
                    />
                  </FormField>
                </Box>
                <Button
                  label="Remove Adult"
                  onClick={() => deletePassenger('adults', index)}
                  color="status-critical"
                />
              </Box>
            ))}
            <Button label="Add Adult" onClick={() => addPassenger('adults')} />
          </Box>

          <Box>
            <Heading level={5}>Children</Heading>
            {passengerDetails.children.map((child, index) => (
              <Box key={index} margin={{ bottom: 'small' }} border round>
                <Heading level={6}>Child {index + 1}</Heading>
                <Box direction="row" gap="small">
                  <FormField label="Name" required>
                    <TextInput
                      placeholder="Enter name"
                      value={child.name}
                      onChange={(e) =>
                        handlePassengerChange('children', index, 'name', e.target.value)
                      }
                    />
                  </FormField>
                  <FormField label="Age" required>
                    <TextInput
                      placeholder="Enter age"
                      value={child.age}
                      onChange={(e) =>
                        handlePassengerChange('children', index, 'age', e.target.value)
                      }
                    />
                  </FormField>
                </Box>
                <Button
                  label="Remove Child"
                  onClick={() => deletePassenger('children', index)}
                  color="status-critical"
                />
              </Box>
            ))}
            <Button label="Add Child" onClick={() => addPassenger('children')} />
          </Box>

          
          <Heading level={4}>Payment Details</Heading>
          <Box direction="row" gap="large">
            <FormField label="Payment Method" required>
              <Select
                options={['Cash', 'Card']}
                value={formData.paymentMethod}
                onChange={({ option }) =>
                  setFormData({ ...formData, paymentMethod: option })
                }
                placeholder="Choose a payment method"
              />
            </FormField>
            <FormField label="Total Amount">
              <TextInput
                value={`$${calculateTotal()}`}
                readOnly
                style={{ backgroundColor: '#f7f7f7' }}
              />
            </FormField>
          </Box>
          <Box align="center" margin={{ top: 'medium' }}>
            <Button type="submit" label="Confirm Booking" primary />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default Booking;
