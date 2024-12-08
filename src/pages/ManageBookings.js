import React, { useState, useEffect } from 'react';
import { Box, Button, DataTable, Heading, Layer, Text } from 'grommet';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useUser } from './UserContext';

const ManageBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [columns, setColumns] = useState([]);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { user } = useUser();
  const fetchBookings = async () => {
    try {
      const email = user.email; 
      const response = await fetch(`http://localhost:8080/api/manage-booking?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setBookings(data); // Set the bookings from the response
  
        // Generate dynamic columns
        if (data.length > 0) {
          const dynamicColumns = [
            {
              property: 'cruiseName',
              header: 'Cruise Name',
              sortable: true,
            },
            {
              property: 'stateRoomName',
              header: 'Stateroom Name',
              sortable: true,
            },
            {
              property: 'startDate',
              header: 'Start Date',
              sortable: true,
            },
            {
              property: 'endDate',
              header: 'End Date',
              sortable: true,
            },
            {
              property: 'peopleNum',
              header: 'No. of People',
              sortable: true,
            },
            {
              property: 'totalNights',
              header: 'Nights',
              sortable: true,
            },
            {
              property: 'payment',
              header: 'Payment Amount',
              sortable: true,
              render: (datum) => `$${datum.payment.toFixed(2)}`,
            },
            {
              property: 'paymentMethod',
              header: 'Payment Method',
              sortable: true,
            },
            {
              property: 'actions',
              header: 'Actions',
              render: (datum) => (
                <Button
                  label="Cancel Booking"
                  color="status-critical"
                  onClick={() => {
                    setSelectedBooking(datum.tripId);
                    setShowCancelConfirmation(true);
                  }}
                />
              ),
            },
          ];
  
          setColumns(dynamicColumns);
        }
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  

  const handleCancelBooking = async () => {
    try {
      const bookingToDelete = bookings.find((booking) => booking.tripId === selectedBooking);
      
      if (!bookingToDelete) {
        console.error('Booking not found');
        setShowCancelConfirmation(false);
        return;
      }
  
      const response = await fetch(`http://localhost:8080/api/delete-booking`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([bookingToDelete]),
      });
  
      if (response.ok) {
        
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.tripId !== selectedBooking)
        );
        setShowCancelConfirmation(false);
        setSelectedBooking(null);
      } else {
        console.error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };
  

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBookCruise = () => {
    navigate('/booking');
  };

  return (
    <Box fill>
      <Header title="Manage Your Bookings" />

      <Box pad="medium">
        <Box margin={{ bottom: 'medium' }} align="center">
          <Button
            label="Book a Cruise"
            primary
            onClick={handleBookCruise}
            color="brand"
          />
        </Box>

        {bookings.length > 0 ? (
          <DataTable
            columns={columns}
            data={bookings}
            sortable
            size="large"
          />
        ) : (
          <Text>No bookings available</Text>
        )}

        {showCancelConfirmation && (
          <Layer
            onEsc={() => setShowCancelConfirmation(false)}
            onClickOutside={() => setShowCancelConfirmation(false)}
            style={{ borderRadius: '10px' }}
          >
            <Box pad="medium" gap="medium" width="medium" round="small">
              <Heading level={3} margin="none">
                Confirm Cancellation
              </Heading>
              <Text>
                Are you sure you want to cancel this booking? This action
                cannot be undone.
              </Text>
              <Box direction="row" gap="small" justify="end">
                <Button
                  label="No, Keep It"
                  onClick={() => setShowCancelConfirmation(false)}
                />
                <Button
                  label="Yes, Cancel It"
                  primary
                  color="status-critical"
                  onClick={handleCancelBooking}
                />
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    </Box>
  );
};

export default ManageBookings;
