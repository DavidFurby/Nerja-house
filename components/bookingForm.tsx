import React, { useState } from "react";
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css";

export default function BookingForm({ rentedDates }) {
  let [fromDate, setFromDate] = useState<Date>(new Date());
  let [toDate, setToDate] = useState<Date>(new Date());
  let { addNewBooking } = UseBooking();

  const datesAreAvailable = function(rentedDates: Date[]): boolean {
    return !rentedDates.some(
      (date) =>
        date.getDate() === fromDate.getDate() ||
        date.getDate() === toDate.getDate()
    );
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
    <form
      className={classes.bookingForm}
      onSubmit={(e) => {
        e.preventDefault();
        addNewBooking({ from: fromDate, to: toDate });
        alert("bokad tid");
      }}
    >
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
      <button
        disabled={datesAreAvailable.call(this, rentedDates) ? false : true}
        title="book"
        type="submit"
      >
        Boka
      </button>
    </form>
  );
}
