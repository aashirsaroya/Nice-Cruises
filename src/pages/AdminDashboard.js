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
  Pagination,
} from 'grommet';
import Header  from '../components/Header';
import axios from 'axios';

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

const handleAddAdmin = async () => {
  try {
    const payload = {
      firstName: adminForm.firstName, 
      lastName: adminForm.lastName,
      email: adminForm.username, 
      password: adminForm.password,
    };

    const response = await axios.post('http://localhost:8080/api/users/admin/register', payload);
    console.log(response.data); 
    alert('Admin registered successfully!');
    setShowAddAdmin(false);
    setAdminForm({ username: '', password: '', firstName: '', lastName: '' });
  } catch (error) {
    console.error(error);
    alert('Error occurred while registering Admin: ' + error.response.data);
  }
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
        <Header title="NICE Cruises Admin Dashboard" />

        <Box direction="row" justify="evenly" pad={{ vertical: 'small' }}>
          <Button
            label="Add Admin"
            onClick={() => setShowAddAdmin(true)}
            primary
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
            <FormField name="firstName" label="First Name" required>
              <TextInput name="firstName" placeholder="Enter first name" />
            </FormField>
            <FormField name="lastName" label="Last Name" required>
              <TextInput name="lastName" placeholder="Enter last name" />
            </FormField>
            <FormField name="username" label="Email" required>
              <TextInput name="username" placeholder="Enter email" />
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
