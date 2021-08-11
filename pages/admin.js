import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { Calendar } from "../components/Calendar";
import Spinner from "../components/Spinner";
import { UseAuth } from "../utils/firebase/context/AuthContext";
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Admin = () => {
  const hasFetchedData = useRef(false);
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let { addNewBooking, fetchBookings } = UseBooking();
  let [minimumDate, setMinimumDate] = useState("");
  let [bookedDates, setBookedDates] = useState([]);
  let { currentUser } = UseAuth();
  let [loading, setLoading] = useState(true);
  const router = useRouter();

  const setDates = () => {
      let minimumDate = new Date();
      const year = minimumDate.getFullYear();
      let month = minimumDate.getMonth() + 1;
      month = ifSingleDigit(month);
      let day = minimumDate.getDate();
      day = ifSingleDigit(day);
      minimumDate = year + "-" + month + "-" + day;
      setMinimumDate(minimumDate);
  
  };
  const ifSingleDigit = (number) => {
    if (number.toString().length < 2) {
      return 0 + number.toString();
    } else {
      return;
    }
  };
  const handleNewBooking = (e) => {
    e.preventDefault();

    if (startDate.length && endDate.length) {
      const from = toDateType(startDate);
      const to = toDateType(endDate);

      for (let i = 0; i < bookedDates.length; i++) {
        const rentedDates = getDatesBetweenRentedDays(
          bookedDates[i].from,
          bookedDates[i].to
        );
        if (
          rentedDates[i].getTime() === from.getTime() ||
          rentedDates[i].getTime() === to.getTime()
        ) {
          return alert("tid redan bokad");
        }
      }
      const booking = { from, to };
      addNewBooking(booking);
      alert("bokning lagd");
    } else {
      alert("måste ange ett datum för start och slut av bokning");
    }
  };

  const toDateType = (date) => {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 11);
    return new Date(year, month - 1, day);
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

  const getDatesBetweenRentedDays = (from, to) => {
    const dates = [];
    let currentDate = from;
    if (from.getTime() !== to.getTime()) {
      const addDays = function (days) {
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

  const getBookedDates = async () => {
    const tempBookings = await fetchBookings();
    if (tempBookings && isMounted) {
      setBookedDates(tempBookings);
    }
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    if (!currentUser && !loading) {
      router.push("/");
    }
    if (!hasFetchedData.current) {
      setDates();
      getBookedDates();
      hasFetchedData.current = true;
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [currentUser, loading, getBookedDates, router, setDates]);
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
            <form onSubmit={handleNewBooking}>
              <section>
                <label>
                  start datum:
                  <input
                    type="date"
                    min={minimumDate}
                    max={endDate}
                    value={startDate}
                    onChange={(startDate) => handleChangeDate(startDate, true)}
                  />
                </label>
              </section>
              <div>
                <label>
                  slut datum:
                  <input
                    type="date"
                    min={startDate ? startDate : minimumDate}
                    value={endDate}
                    onChange={(endDate) => handleChangeDate(endDate, false)}
                  />
                </label>
              </div>

              <input
                className="button"
                type="submit"
                value="Lägg till en ny bokning"
              />
            </form>
          </section>
          <section>
            <Calendar
              data-aos="fade-in"
              data-aot-once="true"
              data-aos-delay="400"
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

export default Admin;
