import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../pages/UserContext';

const Header = ({ title }) => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box direction="row" justify="between" align="center" pad="small" background="brand">
      <Heading level={3} margin="none" color="white">
        {title}
      </Heading>
      <Button label="Logout" onClick={handleLogout} />
    </Box>
  );
};

export default Header;
