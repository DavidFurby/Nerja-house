import { Calendar } from "../components/Calendar";
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css";
import { useEffect, useState, useRef } from "react";
import Spinner from "../components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const booking = () => {
  let { fetchBookings } = UseBooking();
  let [loading, setLoading] = useState(true);
  let [bookedDates, setBookedDates] = useState([]);

  const getDatesBetweenRentedDays = (from, to) => {
    const dates = [];
    let currentDate = from;
    const addDays = function (days) {
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
  const getBookedDates = async () => {
    const tempBookings = await fetchBookings();
    if (tempBookings) {
      setBookedDates(tempBookings);
    }
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    getBookedDates();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {!loading && Calendar ? (
        <div className={classes.container}>
          <section
            className={classes.information}
            data-aos="fade-in"
            data-aot-once="true"
            data-aos-delay="400"
            data-aos-duration="400"
          >
            <h1>Tillgängliga tider</h1>
            <p>
              Datum som redan är inbokade är markerade med{" "}
              <span style={{ color: "#00d14d" }}>grönt</span>{" "}
            </p>
            <p>
              Vill ni boka en tid kontakta oss på någon av våra kontaktuppgifter
            </p>
            <p>Email: </p>
            <p>Telefon: </p>
          </section>
          <section>
            <Calendar
              data-aos="fade-in"
              data-aot-once="true"
              data-aos-duration="400"
              bookedDates={bookedDates}
              getDatesBetweenRentedDays={getDatesBetweenRentedDays}
            />
          </section>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default booking;
