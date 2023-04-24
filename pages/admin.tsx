import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback} from "react";
import { Calendar } from "../components/calendar";
import { UseAuth } from "../utils/firebase/context/AuthContext";
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Admin = () => {
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  let { addNewBooking, bookings } = UseBooking();
  let { currentUser } = UseAuth();
  let [loading, setLoading] = useState(true);
  const router = useRouter();

  const setDates = useCallback(() => {
    let minimumDate = new Date();
    let month = minimumDate.getMonth() + 1;
    month = ifSingleDigit(month);
    let day = minimumDate.getDate();
    day = ifSingleDigit(day);
  }, []);

  const ifSingleDigit = (number) => {
    if (number.toString().length < 2) {
      return 0 + number.toString();
    } else {
      return number;
    }
  };

  const handleNewBooking = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (startDate != null && endDate != null) {
      for (let i = 0; i < bookings.length; i++) {
        const rentedDates = getDatesBetweenRentedDays(
          bookings[i].from,
          bookings[i].to
        );
        if (
          rentedDates[i].getTime() === startDate.getTime() ||
          rentedDates[i].getTime() === endDate.getTime()
        ) {
          return alert("tid redan bokad");
        }
      }
      const booking = { startDate, endDate };
      addNewBooking(booking);
      alert("bokning placerad");
    } else {
      alert("måste ange ett datum för start och slut av bokning");
    }
  };
  const handleChangeDate = (date, type) => {
    date = date.target.value;
    date;

    if (type) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const getDatesBetweenRentedDays = (from: Date, to: Date) => {
    const dates = [];
    let currentDate = from;
    if (from !== to) {
      const addDays = function(days: number) {
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
    dates;
    return dates;
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    if (!currentUser && !loading) {
      router.push("/");
    } else {
      setDates();
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [bookings, setDates, currentUser, loading, router]);
  return (
    <>
      {!loading && currentUser ? (
        <div className={classes.container}>
          <section
            data-aos="fade-in"
            data-aot-once="true"
            data-aos-delay="400"
            data-aos-duration="400"
          >
            <form className={classes.bookingForm} onSubmit={handleNewBooking}>
              <section>
                <label>
                  start datum
                  <br />
                  <input
                    type="date"
                    value={startDate.toString()}
                    onChange={(startDate) => handleChangeDate(startDate, true)}
                  />
                </label>
              </section>
              <div>
                <label>
                  slut datum
                  <br />
                  <input
                    type="date"
                    value={endDate.toString()}
                    onChange={(endDate) => handleChangeDate(endDate, false)}
                  />
                </label>
              </div>
              <input className="button" type="submit" value="Boka" />
            </form>
          </section>
          <section>
            <Calendar
              data-aos="fade-in"
              data-aot-once="true"
              data-aos-delay="400"
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

export default Admin;
