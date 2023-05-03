import React, { useEffect, useState, useCallback } from "react";
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css";

export default function BookingForm({ getDatesBetweenRentedDays }) {
  let [fromDate, setFromDate] = useState<Date>(new Date());
  let [toDate, setToDate] = useState<Date>(new Date());
  let { addNewBooking, bookings } = UseBooking();

  const setDates = useCallback(() => {
    let minimumDate = new Date();
    let month = minimumDate.getMonth() + 1;
    month = ifSingleDigit(month);
    let day = minimumDate.getDate();
    day = ifSingleDigit(day);
  }, []);

  const ifSingleDigit = (number: number): number => {
    if (number.toString().length < 2) {
      return 0 + number;
    } else {
      return number;
    }
  };

  const handleNewBooking = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (fromDate != null && toDate != null) {
      for (let i = 0; i < bookings.length; i++) {
        const rentedDates = getDatesBetweenRentedDays(
          bookings[i].from,
          bookings[i].to
        );
        if (rentedDates.length > 0) {
          if (
            rentedDates[i].getTime() === fromDate.getTime() ||
            rentedDates[i].getTime() === toDate.getTime()
          ) {
            return alert("tid redan bokad");
          }
        }
      }
      addNewBooking({ from: fromDate, to: toDate });
      alert("bokad tid");
    } else {
      alert("måste ange ett datum för start och slut av bokning");
    }
  };

  const formatDate = (date: Date): string => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <form className={classes.bookingForm} onSubmit={handleNewBooking}>
      <label>
        start datum
        <br />
        <input
          id="fromDate"
          name="fromDate"
          type="date"
          autoComplete="off"
          value={formatDate(fromDate)}
          onChange={(e) => setFromDate(new Date(e.target.value))}
        />
      </label>

      <label>
        slut datum
        <br />
        <input
          id="toDate"
          type="date"
          autoComplete="off"
          value={formatDate(toDate)}
          onChange={(endDate) => setToDate(new Date(endDate.target.value))}
        />
      </label>
      <button title="book" type="submit">
        Boka
      </button>
    </form>
  );
}
