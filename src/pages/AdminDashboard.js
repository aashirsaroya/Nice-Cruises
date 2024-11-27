import React, { useState } from 'react';
import {
  Box,
  Button,
  DataTable,
  Heading,
  Layer,
  Form,
  FormField,
  TextInput,
  Select,
  Menu,
  Pagination,
} from 'grommet';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: 'John Doe',
      cruise: 'Caribbean Getaway',
      stateroom: 'The Haven Suite',
      passengers: 2,
      nights: 5,
      total: '$1200',
      date: '2024-11-20',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      cruise: 'Mediterranean Adventure',
      stateroom: 'Oceanview Window',
      passengers: 4,
      nights: 7,
      total: '$2000',
      date: '2024-11-22',
    },
  ]);

  const [cruiseData, setCruiseData] = useState([
    { id: 1, name: 'Caribbean Getaway' },
    { id: 2, name: 'Mediterranean Adventure' },
  ]);

  const [stateroomData, setStateroomData] = useState([
    { id: 1, type: 'The Haven Suite' },
    { id: 2, type: 'Oceanview Window' },
  ]);

  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showManageEntities, setShowManageEntities] = useState(false);

  const [adminForm, setAdminForm] = useState({ username: '', password: '' });
  const [entityForm, setEntityForm] = useState({
    type: '',
    name: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddAdmin = () => {
    console.log('Adding Admin:', adminForm);
    setShowAddAdmin(false);
    setAdminForm({ username: '', password: '' });
  };

  const handleAddEntity = () => {
    if (entityForm.type === 'Cruise') {
      setCruiseData([...cruiseData, { id: Date.now(), name: entityForm.name }]);
    } else if (entityForm.type === 'Stateroom') {
      setStateroomData([
        ...stateroomData,
        { id: Date.now(), type: entityForm.name },
      ]);
    }
    setShowManageEntities(false);
    setEntityForm({ type: '', name: '' });
  };

  const handleDeleteBooking = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  return (
    <Box fill>
     
      <Box
        direction="row"
        justify="between"
        align="center"
        background="brand"
        pad={{ horizontal: 'medium', vertical: 'small' }}
        style={{ borderBottom: '2px solid #ddd' }}
      >
        <Heading
          level={3}
          margin="none"
          color="white"
          alignSelf="center"
          style={{ flex: 1, textAlign: 'center' }}
        >
          NICE Cruises Admin Dashboard
        </Heading>
        <Menu
          label="Admin Controls"
          items={[
            { label: 'Manage Cruises/Staterooms', onClick: () => setShowManageEntities(true) },
            { label: 'Add Admin', onClick: () => setShowAddAdmin(true) },
          ]}
          dropAlign={{ top: 'bottom', right: 'right' }}
        />
      </Box>

     
      <Box pad="medium">
        <Heading level={3} margin={{ bottom: 'small' }}>
          Bookings
        </Heading>
        <DataTable
          columns={[
            { property: 'customer', header: 'Customer', sortable: true },
            { property: 'cruise', header: 'Cruise', sortable: true },
            { property: 'stateroom', header: 'Stateroom', sortable: true },
            { property: 'passengers', header: 'Passengers', sortable: true },
            { property: 'nights', header: 'Nights', sortable: true },
            { property: 'total', header: 'Total', sortable: true },
            { property: 'date', header: 'Booking Date', sortable: true },
            {
              property: 'actions',
              header: 'Actions',
              render: (datum) => (
                <Button
                  label="Delete"
                  color="status-critical"
                  onClick={() => handleDeleteBooking(datum.id)}
                />
              ),
            },
          ]}
          data={bookings.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )}
          sortable
        />
        <Pagination
          numberItems={bookings.length}
          step={itemsPerPage}
          page={currentPage}
          onChange={({ page }) => setCurrentPage(page)}
        />
      </Box>

     
      {showAddAdmin && (
        <Layer
          onEsc={() => setShowAddAdmin(false)}
          onClickOutside={() => setShowAddAdmin(false)}
          style={{ borderRadius: '10px' }} 
        >
          <Box pad="medium" gap="small" width="medium" round="small">
            <Heading level={3} margin="none">
              Add Admin
            </Heading>
            <Form
              value={adminForm}
              onChange={(nextValue) => setAdminForm(nextValue)}
              onSubmit={handleAddAdmin}
            >
              <FormField name="username" label="Username" required>
                <TextInput name="username" placeholder="Enter username" />
              </FormField>
              <FormField name="password" label="Password" required>
                <TextInput
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
              </FormField>
              <Box direction="row" gap="small" justify="end" margin={{ top: 'small' }}>
                <Button label="Cancel" onClick={() => setShowAddAdmin(false)} />
                <Button label="Add" type="submit" primary />
              </Box>
            </Form>
          </Box>
        </Layer>
      )}

      
      {showManageEntities && (
        <Layer
          onEsc={() => setShowManageEntities(false)}
          onClickOutside={() => setShowManageEntities(false)}
          style={{ borderRadius: '10px' }} 
        >
          <Box pad="medium" gap="small" width="medium" round="small">
            <Heading level={3} margin="none">
              Manage Cruises & Staterooms
            </Heading>
            <Form
              value={entityForm}
              onChange={(nextValue) => setEntityForm(nextValue)}
              onSubmit={handleAddEntity}
            >
              <FormField name="type" label="Type" required>
                <Select
                  name="type"
                  options={['Cruise', 'Stateroom']}
                  placeholder="Select type"
                />
              </FormField>
              <FormField name="name" label="Name" required>
                <TextInput name="name" placeholder="Enter name" />
              </FormField>
              <Box direction="row" gap="small" justify="end" margin={{ top: 'small' }}>
                <Button label="Cancel" onClick={() => setShowManageEntities(false)} />
                <Button label="Add" type="submit" primary />
              </Box>
            </Form>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default AdminDashboard;
