import React from 'react';
import { Box, Heading, Text } from 'grommet';

const ContactSupport = () => (
  <Box fill align="center" justify="center" pad="large">
    <Heading level={2}>Contact Support</Heading>
    <Text size="large" margin="medium">
      Have any questions or need assistance? Feel free to reach out to us!
    </Text>
    <Box>
      <Text size="medium" margin={{ bottom: 'small' }}>
        📞 Phone: +1-800-555-1234
      </Text>
      <Text size="medium">
        📧 Email: support@nicecruises.com
      </Text>
    </Box>
  </Box>
);

export default ContactSupport;
