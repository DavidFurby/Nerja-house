import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { Calendar } from "../components/Calendar";
import { UseAuth } from "../utils/firebase/context/AuthContext";
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import AdminLogin from "../components/adminLogin";

const Admin = () => {
  let [fromDate, setFromDate] = useState<Date>(new Date());
  let [toDate, setToDate] = useState<Date>(new Date());
  let { addNewBooking, bookings } = UseBooking();
  let { currentUser } = UseAuth();
  let [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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

  const getDatesBetweenRentedDays = (from: Date, to: Date): Date[] => {
    const dates: Date[] = [];
    let currentDate = from;
    if (from !== to) {
      const addDays = function(days: number) {
        console.log(days);
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      while (currentDate <= to) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
    } else {
      dates.push(from);
      dates.push(to);
    }
    return dates;
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

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    if (!loading && currentUser === null) {
      router.push("/");
    } else {
      setDates();
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {!loading && currentUser ? (
        <section className={classes.container}>
          <section>
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
                  type="date"
                  autoComplete="off"
                  value={formatDate(toDate)}
                  onChange={(endDate) =>
                    setToDate(new Date(endDate.target.value))
                  }
                />
              </label>
              <button type="submit">Boka</button>
            </form>
          </section>
          <section>
            <Calendar
              bookedDates={bookings}
              getDatesBetweenRentedDays={getDatesBetweenRentedDays}
            />
          </section>
        </section>
      ) : (
        <AdminLogin />
      )}
    </>
  );
};

export default Admin;
