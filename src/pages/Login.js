import React, { useState } from 'react';
import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';
import { View, Hide } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Login = () => {
  const [value, setValue] = useState({ email: '', password: '' });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { login } = useUser(); // Access login function from UserContext
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = () => {
    const { email, password } = value;

    // Check credentials
    if (email === 'admin@gmail.com' && password === 'admin123') {
      // Log in as admin
      login({ role: 'admin', isAuthenticated: true });
      navigate('/admin');
    } else if (email && password) {
      // Log in as customer
      login({ role: 'customer', isAuthenticated: true });
      navigate('/manage-bookings');
    } else {
      alert('Invalid credentials. Please try again.');
    }
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
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: -1,
        }}
      />

      <Box
        width="medium"
        pad="medium"
        background={{ color: 'light-1', opacity: 'strong' }}
        round="small"
        elevation="large"
        style={{
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Heading level={2} margin={{ bottom: 'medium' }} alignSelf="center">
          Login
        </Heading>
        <Form
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onSubmit={handleSubmit}
        >
          <FormField name="email" label="Email" required>
            <TextInput
              name="email"
              placeholder="Enter your email"
              value={value.email}
              onChange={(event) =>
                setValue((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </FormField>
          <FormField name="password" label="Password" required>
            <Box direction="row" align="center" style={{ position: 'relative' }}>
              <TextInput
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={value.password}
                onChange={(event) =>
                  setValue((prev) => ({ ...prev, password: event.target.value }))
                }
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
          <Box
            direction="row"
            gap="medium"
            margin={{ top: 'medium' }}
            justify="center"
          >
            <Button type="submit" label="Login" primary />
          </Box>
        </Form>
        <Box align="center" margin={{ top: 'medium' }}>
          <Button
            label="Forgot Password?"
            plain
            style={{
              textDecoration: 'underline',
              color: '#6C63FF',
              fontWeight: 'bold',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
