import React, { useState } from 'react';
import { Box, Button, Form, FormField, Heading, TextInput, Select } from 'grommet';
import { View, Hide } from 'grommet-icons'; 

const countryOptions = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 
  'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 
  'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 
  'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 
  'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Congo (Democratic Republic of the Congo)', 'Costa Rica', 'Croatia', 
  'Cuba', 'Cyprus', 'Czechia (Czech Republic)', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini (fmr. "Swaziland")', 'Ethiopia', 'Fiji', 'Finland', 
  'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 
  'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea (North)', 'Korea (South)', 'Kuwait', 'Kyrgyzstan', 
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 
  'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)', 'Namibia', 'Nauru', 
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia (formerly Macedonia)', 'Norway', 
  'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 
  'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 
  'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 
  'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 
  'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 
  'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 
  'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];


const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    streetLine1: '',
    streetLine2: '',
    zipCode: '',
    city: '',
    state: '',
    country: '',
    phone: '',
  });

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = () => {
    console.log('Registering User:', JSON.stringify(formData, null, 2)); // Log form data as JSON
    // Add your API call here
  };

  return (
    <Box
      fill
      align="center"
      justify="center"
      style={{
        position: 'relative',
        backgroundImage: 'url(/login-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
        }}
      />

      <Box
        width="large"
        pad="medium"
        background={{ color: 'light-1', opacity: 'strong' }}
        round="small"
        elevation="large"
        style={{
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box>
          <Heading level={2} margin={{ bottom: 'small' }} alignSelf="center">
            Register
          </Heading>
        </Box>

        <Box height="70vh" overflow="auto" pad={{ vertical: 'small' }}>
          <Form
            value={formData}
            onChange={(nextValue) => setFormData(nextValue)}
            onSubmit={handleRegister}
          >
            <Box direction="row" gap="medium">
              <FormField
                name="firstName"
                label="First Name"
                required
                validate={(value) => (value ? undefined : 'First Name is required')}
              >
                <TextInput
                  name="firstName"
                  placeholder="Enter your first name"
                  style={{ borderColor: '#ccc', color: '#333' }}
                />
              </FormField>
              <FormField
                name="lastName"
                label="Last Name"
                required
                validate={(value) => (value ? undefined : 'Last Name is required')}
              >
                <TextInput
                  name="lastName"
                  placeholder="Enter your last name"
                  style={{ borderColor: '#ccc', color: '#333' }}
                />
              </FormField>
            </Box>
            <Box direction="row" gap="medium">
              <FormField
                name="email"
                label="Email"
                required
                validate={(value) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Enter a valid email'
                }
              >
                <TextInput
                  name="email"
                  placeholder="Enter your email"
                  style={{ borderColor: '#ccc', color: '#333' }}
                />
              </FormField>
              <FormField name="password" label="Password" required>
                <Box direction="row" align="center" style={{ position: 'relative' }}>
                  <TextInput
                    name="password"
                    type={isPasswordVisible ? 'text' : 'password'} 
                    placeholder="Enter your password"
                    style={{ borderColor: '#ccc', color: '#333', flex: '1' }}
                  />
                  <Button
                    icon={isPasswordVisible ? <Hide /> : <View />} 
                    onClick={togglePasswordVisibility}
                    plain
                    style={{
                      position: 'absolute',
                      right: '10px', 
                      cursor: 'pointer',
                    }}
                  />
                </Box>
              </FormField>
            </Box>
            <Box direction="row" gap="medium">
              <FormField
                name="phone"
                label="Phone"
                validate={(value) =>
                  /^\d{10}$/.test(value) || value === ''
                    ? undefined
                    : 'Enter a valid 10-digit phone number'
                }
              >
                <TextInput
                  name="phone"
                  placeholder="Enter your phone number"
                  style={{ borderColor: '#ccc', color: '#333' }}
                />
              </FormField>
            </Box>
            <Heading level={4} margin={{ top: 'medium', bottom: 'small' }}>
              Address
            </Heading>
            <FormField
              name="streetLine1"
              label="Street Line 1"
              required
              validate={(value) => (value ? undefined : 'Street Line 1 is required')}
            >
              <TextInput
                name="streetLine1"
                placeholder="Enter street line 1"
                style={{ borderColor: '#ccc', color: '#333' }}
              />
            </FormField>
            <Box direction="row" gap="medium">
              <FormField name="streetLine2" label="Street Line 2">
                <TextInput
                  name="streetLine2"
                  placeholder="Enter street line 2 (optional)"
                  style={{ borderColor: '#ccc', color: '#333' }}
                />
              </FormField>
              <FormField
                name="zipCode"
                label="ZIP Code"
                required
                validate={(value) =>
                  /^\d{5}$/.test(value) ? undefined : 'Enter a valid 5-digit ZIP code'
                }
              >
                <TextInput
                  name="zipCode"
                  placeholder="Enter your ZIP code"
                  style={{ borderColor: '#ccc', color: '#333' }}
                />
              </FormField>
            </Box>
            <Box direction="row" gap="medium">
              <FormField
                name="city"
                label="City"
                required
                validate={(value) => (value ? undefined : 'City is required')}
              >
                <TextInput
                  name="city"
                  placeholder="Enter your city"
                  style={{ borderColor: '#ccc', color: '#333' }}
                />
              </FormField>
              <FormField
                name="state"
                label="State"
                required
                validate={(value) => (value ? undefined : 'State is required')}
              >
                <TextInput
                  name="state"
                  placeholder="Enter your state (e.g. NY)"
                  style={{ borderColor: '#ccc', color: '#333' }}
                  value={formData.state}
                  onChange={({ target }) =>
                    setFormData((prev) => ({ ...prev, state: target.value }))
                  }
                />
              </FormField>
              <FormField
                name="country"
                label="Country"
                required
                validate={(value) => (value ? undefined : 'Country is required')}
              >
                <Select
                  name="country"
                  options={countryOptions}
                  placeholder="Select your country"
                  value={formData.country}
                  onChange={({ option }) =>
                    setFormData((prev) => ({ ...prev, country: option }))
                  }
                />
              </FormField>
            </Box>
            <Box direction="row" gap="medium" margin={{ top: 'medium' }} justify="center">
              <Button type="submit" label="Register" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
