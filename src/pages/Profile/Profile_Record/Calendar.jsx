import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function Calendar({setSelectedDate , getAcceptedLeave , userId}) {

  const handleDateChange = (newDate) => {
    // Do something with the selected date
    getAcceptedLeave(userId,  dayjs(newDate['$d']).format("YYYY-MM-DD"))
    setSelectedDate(newDate['$d']);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar onChange={handleDateChange} />
    </LocalizationProvider>
  );
}
