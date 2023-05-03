import { Calendar } from "./Calendar";
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Booking = () => {
  let [loading, setLoading] = useState<boolean>(true);

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
        <section className={classes.container}>
          <section className={classes.text}>
            <h1>Tillgängliga tider</h1>
            <p>
              Priserna varierar mellan 6000 kr - 25 000 kr per vecka beroende på
              säsong och antalet gäster
            </p>
            <p>
              Datum som redan är inbokade är markerade med
              <span style={{ color: "#0cdd58" }}> grönt</span>
            </p>
          </section>
        </section>
      ) : null}
    </>
  );
};

export default Booking;
