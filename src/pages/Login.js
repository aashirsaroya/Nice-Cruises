import React, { useState } from 'react';
import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';
import { View, Hide } from 'grommet-icons';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [value, setValue] = useState({ email: '', password: '' });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = () => {
    console.log('Logging in:', value);

    
    if (value.email === 'admin@gmail.com' && value.password === 'admin123') {
      navigate('/admin');
    } else {
      navigate('/manage-bookings');
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
        style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
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
            <TextInput name="email" placeholder="Enter your email" />
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
