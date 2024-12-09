import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  DataTable,
  Heading,
  Layer,
  Form,
  FormField,
  TextInput,
  Text,
} from 'grommet';
import Header from '../components/Header';
import axios from 'axios';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({ username: '', password: '', firstName: '', lastName: '' });
  const [confirmDeleteBookingId, setConfirmDeleteBookingId] = useState(null);

  // New state for showing the analytics popup
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/manage-booking');
      const responseData = response.data;
      const allBookings = [];
      Object.keys(responseData).forEach((email) => {
        responseData[email].forEach((b) => {
          allBookings.push({
            ...b,
            customer: email,
          });
        });
      });

      const uniqueBookings = allBookings.filter(
        (newBooking, index, self) =>
          index === self.findIndex((bk) => bk.groupId === newBooking.groupId)
      );

      setBookings(uniqueBookings); 
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Error occurred while fetching bookings: ' + error);
    }
  };

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
      alert('Error occurred while registering Admin: ' + (error.response?.data || error.message));
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      const bookingToDelete = bookings.find((b) => b.groupId === id);

      if (!bookingToDelete) {
        alert('Booking not found.');
        setConfirmDeleteBookingId(null);
        return;
      }

      const { customer, ...cleanBooking } = bookingToDelete;

      await axios.delete('http://localhost:8080/api/delete-booking', {
        data: [cleanBooking],
      });

      await fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Error occurred while deleting booking: ' + error.message);
    } finally {
      setConfirmDeleteBookingId(null);
    }
  };

  // Prepare analytics data
  const generateAnalyticsData = () => {
    const cruiseCounts = {};
    bookings.forEach((b) => {
      cruiseCounts[b.cruiseName] = (cruiseCounts[b.cruiseName] || 0) + 1;
    });

    const labels = Object.keys(cruiseCounts);
    const dataValues = Object.values(cruiseCounts);

    return { labels, dataValues };
  };

  return (
    <Box fill>
      <Header title="NICE Cruises Admin Dashboard" />

      <Box direction="row" justify="evenly" pad={{ vertical: 'small' }}>
        <Button label="Add Admin" onClick={() => setShowAddAdmin(true)} primary />
        <Button label="Refresh" onClick={fetchBookings} />
        {/* New button to show the analytics */}
        <Button label="See Analytics" onClick={() => setShowAnalytics(true)} />
      </Box>

      <Box pad="medium">
        <Heading level={3} margin={{ bottom: 'small' }}>
          Bookings
        </Heading>
        <DataTable
          columns={[
            { property: 'customer', header: 'Customer', sortable: true },
            { property: 'cruiseName', header: 'Cruise Name', sortable: true },
            { property: 'stateRoomName', header: 'State Room Name', sortable: true },
            { property: 'peopleNum', header: 'Passengers', sortable: true },
            { property: 'totalNights', header: 'Nights', sortable: true },
            { property: 'payment', header: 'Total', sortable: true },
            { property: 'paymentDate', header: 'Payment Date', sortable: true },
            {
              property: 'actions',
              header: 'Actions',
              render: (datum) => (
                <Button
                  label="Delete"
                  color="status-critical"
                  onClick={() => setConfirmDeleteBookingId(datum.groupId)}
                />
              ),
            },
          ]}
          data={bookings}
          sortable
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
                <TextInput name="password" type="password" placeholder="Enter password" />
              </FormField>
              <Box direction="row" gap="small" justify="end" margin={{ top: 'small' }}>
                <Button label="Cancel" onClick={() => setShowAddAdmin(false)} />
                <Button label="Add" type="submit" primary />
              </Box>
            </Form>
          </Box>
        </Layer>
      )}

      {confirmDeleteBookingId && (
        <Layer
          onEsc={() => setConfirmDeleteBookingId(null)}
          onClickOutside={() => setConfirmDeleteBookingId(null)}
          style={{ borderRadius: '10px' }}
        >
          <Box pad="medium" gap="small" width="medium" round="small">
            <Heading level={3} margin="none">
              Confirm Deletion
            </Heading>
            <Text>Are you sure you want to delete this booking?</Text>
            <Box direction="row" gap="small" justify="end" margin={{ top: 'small' }}>
              <Button label="No" onClick={() => setConfirmDeleteBookingId(null)} />
              <Button
                label="Yes"
                onClick={() => handleDeleteBooking(confirmDeleteBookingId)}
                primary
              />
            </Box>
          </Box>
        </Layer>
      )}

      {showAnalytics && (
        <Layer
          onEsc={() => setShowAnalytics(false)}
          onClickOutside={() => setShowAnalytics(false)}
          style={{ borderRadius: '10px' }}
        >
          <Box pad="medium" gap="small" width="medium" round="small">
            <Heading level={3} margin={{ bottom: 'small' }}>
              Analytics
            </Heading>
            {(() => {
              const { labels, dataValues } = generateAnalyticsData();

              if (labels.length === 0) {
                return <Text>No bookings available for analytics.</Text>;
              }

              const data = {
                labels,
                datasets: [
                  {
                    label: 'Number of Bookings by Cruise',
                    data: dataValues,
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#4BC0C0',
                      '#9966FF',
                      '#FF9F40',
                    ],
                    hoverOffset: 4,
                  },
                ],
              };

              return (
                <Box width="medium" height="medium" justify="center" align="center">
                  <Pie data={data} options={{ maintainAspectRatio: false }} />
                </Box>
              );
            })()}
            <Box direction="row" justify="end" margin={{ top: 'small' }}>
              <Button label="Close" onClick={() => setShowAnalytics(false)} />
            </Box>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default AdminDashboard;
