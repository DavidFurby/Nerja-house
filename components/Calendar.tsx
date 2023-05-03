import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import classes from "../styles/booking.module.css";
import { UseBooking } from "../utils/firebase/context/BookingContext";
import BookingForm from "./bookingForm";
import Booking from "./booking";
import { useRouter } from "next/router";
export const Calendar = () => {
  const router = useRouter();
  let { bookings } = UseBooking();
  let [months, setMonths] = useState<[Date[]]>();
  let [loading, setLoading] = useState<boolean>(true);
  let [currentDate, setCurrentDate] = useState<Date>(new Date());
  const hasFetchedData = useRef<boolean>(false);
  const weekDays: string[] = ["mån", "tis", "ons", "tors", "fre", "lör", "sön"];
  const weeksInMonth: number[] = [0, 1, 2, 3, 4, 5];
  const monthNames: string[] = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];
  let rentedDates: Date[] = [];

  const getMonthsForYear = useCallback(
    async (date: { getFullYear: () => any }) => {
      const currentYear = date.getFullYear();
      let dateList: [Date[]] = [] as any;
      for (let i = 0; i <= 12; i++) {
        let date = new Date(currentYear, i + 1, 0);
        let daysInMonth: Date[] = [];
        for (let j = 1; j <= date.getDate(); j++) {
          daysInMonth.push(new Date(currentYear, i, j));
        }
        dateList.push(daysInMonth);
      }
      setMonths(dateList);
    },
    []
  );

  const handleChangeMonth = (selection: boolean) => {
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth();
    let newDate: Date;
    if (selection) {
      newDate = month < 11 ? new Date(year, month + 1) : new Date(year + 1, 0);
      setCurrentDate(() => newDate);
      if (month === 11) {
        getMonthsForYear(newDate);
      }
    } else {
      newDate = month > 0 ? new Date(year, month - 1) : new Date(year - 1, 11);
      setCurrentDate(() => newDate);
      if (month === 0) {
        getMonthsForYear(newDate);
      }
    }
  };
  const getDatesBetweenRentedDays = (from: Date, to: Date): Date[] => {
    const dates: Date[] = [];
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
    return dates;
  };

  const setEmptyDates = () => {
    const daysInMonth = months[currentDate.getMonth()];
    let dayList: Date[] = [];

    // Add filler days from previous month
    const firstDay = daysInMonth[0];
    if (firstDay.getDay() !== 1) {
      const fillerPositions =
        firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
      const prevMonthIndex =
        currentDate.getMonth() === 0
          ? currentDate.getMonth() + 11
          : currentDate.getMonth() - 1;

      const prevMonthDays = months[prevMonthIndex];
      dayList.push(...prevMonthDays.slice(-fillerPositions));
    }
    // Add days from current month
    dayList.push(...daysInMonth);

    // Add remaining days from next month
    const lastDay = daysInMonth[daysInMonth.length - 1];

    const remainingDays = 7 - lastDay.getDay();
    const nextMonthIndex = currentDate.getMonth() + 1;
    const nextMonthDays = months[nextMonthIndex];

    dayList.push(...nextMonthDays.slice(0, remainingDays));
    return dayList;
  };

  function isDayBooked(rentedDates: Date[], day: Date) {
    for (let j = 0; j < rentedDates.length; j++) {
      if (
        rentedDates[j].getFullYear() === day.getFullYear() &&
        rentedDates[j].getMonth() === day.getMonth() &&
        rentedDates[j].getDate() === day.getDate()
      ) {
        return true;
      }
    }
  }

  useEffect(() => {
    if (!hasFetchedData.current) {
      getMonthsForYear(currentDate);
      hasFetchedData.current = true;
    }
    setTimeout(() => {
      setLoading(false);
    }, 200);

    return function cleanup() {};
  }, [currentDate, getMonthsForYear]);

  if (bookings) {
    for (let i = 0; i < bookings.length; i++) {
      rentedDates.push(
        ...getDatesBetweenRentedDays(bookings[i].from, bookings[i].to)
      );
    }
  }

  const SelectMonthButtons = () => {
    return (
      <div className={classes.monthSelection}>
        <button
          title="left"
          className="button"
          onClick={() => handleChangeMonth(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2 style={{ fontWeight: "lighter" }}>
          {monthNames[currentDate.getMonth()]}
        </h2>
        <button
          title="right"
          className="button"
          onClick={() => handleChangeMonth(true)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {router.pathname === "/admin" ? (
        <BookingForm getDatesBetweenRentedDays={getDatesBetweenRentedDays} />
      ) : (
        <Booking />
      )}
      {!loading ? (
        <div className={classes.calendarContainer}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ fontWeight: "lighter" }}>
              {currentDate.getFullYear()}
            </h1>
          </div>
          <SelectMonthButtons />
          <table className={classes.calendar}>
            <thead>
              <tr>
                {weekDays.map((weekDay, index) => {
                  return (
                    <th key={index}>
                      <h4 style={{ fontWeight: "normal" }}>{weekDay}</h4>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {weeksInMonth.map((_weekDay, index) => {
                const dayList = setEmptyDates();
                const sliceDaysInWeeks = dayList.slice(
                  index === 0 ? 0 : 7 * index,
                  index === 0 ? 7 : 7 * index + 7
                );
                return (
                  <tr key={index}>
                    {sliceDaysInWeeks.map((day, dayIndex) => {
                      return (
                        <th key={dayIndex}>
                          <p
                            style={{
                              borderBottom: isDayBooked(rentedDates, day)
                                ? "4px solid #00d14d"
                                : null,
                              color:
                                day.getMonth() != currentDate.getMonth()
                                  ? "grey"
                                  : "black",
                            }}
                            className={classes.calendarDates}
                          >
                            {day.getDate()}
                          </p>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};
