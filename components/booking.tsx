import { Calendar } from "./calendar";
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Booking = () => {
  let { bookings } = UseBooking();
  let [loading, setLoading] = useState(true);

  const getDatesBetweenRentedDays = (from: Date, to: Date) => {
    const dates = [];
    let currentDate = from;
    const addDays = function(days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= to) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      AOS.init();
      AOS.refresh();
      setLoading(false);
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);
  return (
    <>
      {!loading ? (
        <div className={classes.container}>
          <section>
            <h1>Tillgängliga tider</h1>
            <p>
              Priserna varierar mellan 6000 kr - 25 000 kr per vecka beroende på
              säsong och antalet gäster
            </p>
            <p>
              Datum som redan är inbokade är markerade med
              <span style={{ color: "#0cdd58" }}> grönt</span>
            </p>
            <p>
              Vill ni boka en tid kontakta oss på någon av våra kontaktuppgifter
            </p>
          </section>
          <section>
            <Calendar
              data-aos="fade-in"
              data-aot-once="true"
              data-aos-duration="400"
              bookedDates={bookings}
              getDatesBetweenRentedDays={getDatesBetweenRentedDays}
            />
          </section>
        </div>
      ) : null}
    </>
  );
};

export default Booking;