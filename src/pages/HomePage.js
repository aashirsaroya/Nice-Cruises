import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { Login, UserAdd, Book } from 'grommet-icons';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <Box
    fill
    align="center"
    justify="center"
    style={{
      position: 'relative',
      overflow: 'hidden',
      height: '100vh',
      color: 'white',
    }}
  >
    <video
      autoPlay
      loop
      muted
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -2,
      }}
    >
      <source src="/cruise.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <Box
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: -1,
      }}
    />

    
    <Heading level={1} margin="medium" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
      Welcome to NICE Cruises!
    </Heading>
    <Box direction="row" gap="medium">
      <Link to="/login">
        <Button icon={<Login color="white" />} label="Login" primary />
      </Link>
      <Link to="/register">
        <Button
          icon={<UserAdd color="white" />}
          label="Register"
          secondary
          style={{
            color: 'white',
            borderColor: 'white',
            borderWidth: '2px',
          }}
        />
      </Link>
    </Box>
  </Box>
);

export default HomePage;
