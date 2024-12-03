import React, { useState } from 'react';
import { Box, Button, Heading, Layer, Text } from 'grommet';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../pages/UserContext';

const Header = ({ title }) => {
  const { logout } = useUser();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openConfirmDialog = () => setShowConfirm(true);
  const closeConfirmDialog = () => setShowConfirm(false);

  return (
    <Box direction="row" justify="between" align="center" pad="small" background="brand">
      <Box flex="grow" align="center">
        <Heading level={3} margin="none" color="white">
          {title}
        </Heading>
      </Box>
      <Button label="Logout" onClick={openConfirmDialog} />
      
      {showConfirm && (
        <Layer
          onEsc={closeConfirmDialog}
          onClickOutside={closeConfirmDialog}
        >
          <Box
            pad="medium"
            gap="small"
            width="medium"
            background="white"
            round="small"
            elevation="medium"
          >
            <Text>Are you sure you want to log out?</Text>
            <Box direction="row" gap="medium" justify="end">
              <Button label="Cancel" onClick={closeConfirmDialog} />
              <Button label="Logout" onClick={handleLogout} primary color="status-critical" />
            </Box>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default Header;
