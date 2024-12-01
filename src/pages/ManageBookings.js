import React, { useState } from 'react';
import { Box, Button, DataTable, Heading, Layer, Text } from 'grommet';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; 

const ManageBookings = () => {
  const navigate = useNavigate();

  // Dummy data for customer bookings
  const [bookings, setBookings] = useState([
    {
      id: 1,
      cruise: 'Caribbean Getaway',
      stateroom: 'The Haven Suite',
      passengers: 2,
      nights: 5,
      total: '$1200',
      date: '2024-11-20',
      bookingDate: '2024-11-10',
      status: 'Confirmed',
    },
    {
      id: 2,
      cruise: 'Mediterranean Adventure',
      stateroom: 'Oceanview Window',
      passengers: 4,
      nights: 7,
      total: '$2000',
      date: '2024-12-01',
      bookingDate: '2024-11-15',
      status: 'Confirmed',
    },
    {
      id: 3,
      cruise: 'Alaskan Voyage',
      stateroom: 'Inside Stateroom',
      passengers: 1,
      nights: 3,
      total: '$450',
      date: '2024-11-25',
      bookingDate: '2024-11-18',
      status: 'Cancelled',
    },
  ]);

  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookCruise = () => {
    navigate('/booking');
  };

  const handleCancelBooking = () => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === selectedBooking
          ? { ...booking, status: 'Cancelled' }
          : booking
      )
    );
    setShowCancelConfirmation(false);
    setSelectedBooking(null);
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

        
        <DataTable
          columns={[
            {
              property: 'cruise',
              header: 'Cruise',
              sortable: true,
            },
            {
              property: 'stateroom',
              header: 'Stateroom',
              sortable: true,
            },
            {
              property: 'passengers',
              header: 'Passengers',
              sortable: true,
            },
            {
              property: 'nights',
              header: 'Nights',
              sortable: true,
            },
            {
              property: 'total',
              header: 'Total Cost',
              sortable: true,
            },
            {
              property: 'date',
              header: 'Trip Date',
              sortable: true,
            },
            {
              property: 'bookingDate',
              header: 'Booking Date',
              sortable: true,
            },
            {
              property: 'status',
              header: 'Status',
              sortable: true,
            },
            {
              property: 'actions',
              header: 'Actions',
              render: (datum) =>
                datum.status !== 'Cancelled' ? (
                  <Button
                    label="Cancel Booking"
                    color="status-critical"
                    onClick={() => {
                      setSelectedBooking(datum.id);
                      setShowCancelConfirmation(true);
                    }}
                  />
                ) : (
                  <Text color="status-disabled">Cancelled</Text>
                ),
            },
          ]}
          data={bookings}
          sortable
          size="large"
        />

      
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
                Are you sure you want to cancel this booking? This action cannot
                be undone.
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
