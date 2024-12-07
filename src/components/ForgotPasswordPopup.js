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

const ForgotPasswordPopup = ({ onClose }) => {
  const [step, setStep] = useState('email'); 
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    setMessage('');
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', null, {
        params: { email },
      });
      setMessage(response.data);
      setStep('otp');
    } catch (err) {
      setError(err.response?.data || 'Something went wrong. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    setMessage('');
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      setMessage(response.data);
      setStep('success');
    } catch (err) {
      setError(err.response?.data || 'Something went wrong. Please try again.');
    }
  };

  return (
    <Layer onEsc={onClose} onClickOutside={onClose} responsive position="center" round="small">
      <Box pad="medium" gap="small" width="medium">
        {step === 'email' && (
          <>
            <Heading level={3} margin="none">Forgot Password</Heading>
            <Text>
              Enter your email, and we will send you an OTP to reset your password.
            </Text>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                handleSendOtp();
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
                <Button type="submit" label="Send OTP" primary />
                <Button label="Cancel" onClick={onClose} />
              </Box>
            </Form>
          </>
        )}

        {step === 'otp' && (
          <>
            <Heading level={3} margin="none">Reset Password</Heading>
            <Text>Enter the OTP sent to your email and your new password.</Text>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                handleResetPassword();
              }}
            >
              <FormField name="otp" label="OTP" required>
                <TextInput
                  name="otp"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </FormField>
              <FormField name="newPassword" label="New Password" required>
                <TextInput
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormField>
              <Box direction="row" gap="medium" justify="center" margin={{ top: 'medium' }}>
                <Button type="submit" label="Reset Password" primary />
                <Button label="Cancel" onClick={onClose} />
              </Box>
            </Form>
          </>
        )}

        {step === 'success' && (
          <>
            <Heading level={3} margin="none">Password Reset Successful</Heading>
            <Text>Your password has been reset. You can now log in with your new password.</Text>
            <Box direction="row" gap="medium" justify="center" margin={{ top: 'medium' }}>
              <Button label="Close" onClick={onClose} primary />
            </Box>
          </>
        )}

        {message && <Text color="status-ok">{message}</Text>}
        {error && <Text color="status-critical">{error}</Text>}
      </Box>
    </Layer>
  );
};

export default ForgotPasswordPopup;
