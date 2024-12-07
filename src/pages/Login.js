import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  TextInput,
  Layer,
  Text,
} from 'grommet';
import { View, Hide } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async () => {
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/users/forgot-password', {
        email,
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <Layer onEsc={onClose} onClickOutside={onClose} responsive position="center" round="small">
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">Forgot Password</Heading>
        <Text>
          Enter your email, and we will send you instructions to reset your password.
        </Text>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            handleForgotPassword();
          }}
        >
          <FormField name="email" label="Email" required>
            <TextInput
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
          <Box direction="row" gap="medium" justify="center" margin={{ top: 'medium' }}>
            <Button type="submit" label="Send Email" primary />
            <Button label="Cancel" onClick={onClose} />
          </Box>
        </Form>
        {message && <Text color="status-ok">{message}</Text>}
        {error && <Text color="status-critical">{error}</Text>}
      </Box>
    </Layer>
  );
};

const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const Login = () => {
  const [value, setValue] = useState({ email: '', password: '' });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async () => {
    const { email, password } = value;

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      const { isAdmin } = response.data;
      

      // Compare isAdmin string value explicitly
      login({ 
        email, 
        role: isAdmin === true ? 'admin' : 'customer', 
        isAuthenticated: true 
      });
      navigate(isAdmin === true ? '/admin' : '/manage-bookings');
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Invalid email or password.');
      } else {
        alert('Failed to connect to the server. Please try again later.');
      }
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
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
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
            {!validateEmail(value.email) && value.email && (
              <Text color="status-critical" size="small">
                Please enter a valid email address.
              </Text>
            )}
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
            onClick={() => setShowForgotPassword(true)}
          />
        </Box>
        <Box align="center" margin={{ top: 'medium' }}>
          <Button
            label="Not a Returning User? Register Here"
            plain
            style={{
              textDecoration: 'underline',
              color: '#6C63FF',
              fontWeight: 'bold',
            }}
            onClick={() => navigate('/register')}
          />
        </Box>
      </Box>

      {showForgotPassword && (
        <ForgotPasswordPopup onClose={() => setShowForgotPassword(false)} />
      )}
    </Box>
  );
};

export default Login;