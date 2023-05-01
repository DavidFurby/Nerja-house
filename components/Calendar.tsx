import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import classes from "../styles/booking.module.css";

export const Calendar = (
  bookedDates,
  getDatesBetweenRentedDays: (from: Date, to: Date) => Date[]
) => {
  let [months, setMonths] = useState([]);
  let [loading, setLoading] = useState<boolean>(true);
  let [currentDate, setCurrentDate] = useState<Date>(new Date());
  const hasFetchedData = useRef<boolean>(false);
  const weekDays: string[] = ["mån", "tis", "ons", "tors", "fre", "lör", "sön"];
  const weeksInMonth : number[] = [0, 1, 2, 3, 4, 5];
  const monthNames : string[] = [
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

  const getMonthsForYear = useCallback(
    async (date: { getFullYear: () => any }) => {
      const currentYear = date.getFullYear();
      let monthList = [];
      for (let i = 0; i <= 12; i++) {
        let date = new Date(currentYear, i + 1, 0);
        let dayList = [];
        for (let j = 1; j <= date.getDate(); j++) {
          let currentDate = new Date(currentYear, i, j);
          let day = currentDate.getDay();
          let date = currentDate.getDate();
          let year = currentDate.getFullYear();
          let month = currentDate.getMonth();
          dayList.push({ day, date, year, month });
        }
        monthList.push({ month: date.getMonth(), days: dayList });
      }
      setMonths(monthList);
    },
    []
  );

  const handleChangeMonth = (selection: boolean) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
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

  const setEmptyDates = () => {
    const daysInMonth = months[currentDate.getMonth()].days;
    let dayList = [];

    // Add filler days from previous month
    const firstDay = daysInMonth[0];
    if (firstDay.day !== 1) {
      const fillerPositions = firstDay.day === 0 ? 6 : firstDay.day - 1;
      const prevMonthIndex =
        currentDate.getMonth() === 0
          ? currentDate.getMonth() + 11
          : currentDate.getMonth() - 1;

      const prevMonthDays = months[prevMonthIndex].days;
      dayList.push(...prevMonthDays.slice(-fillerPositions));
    }
    // Add days from current month
    dayList.push(...daysInMonth);

    // Add remaining days from next month
    const lastDay = daysInMonth[daysInMonth.length - 1];

    const remainingDays = 7 - lastDay.day;
    const nextMonthIndex = currentDate.getMonth() + 1;
    const nextMonthDays = months[nextMonthIndex].days;

    dayList.push(...nextMonthDays.slice(0, remainingDays));
    return dayList;
  };

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

  return (
    <>
      {!loading ? (
        <div className={classes.calendarContainer}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ fontWeight: "lighter" }}>
              {currentDate.getFullYear()}
            </h1>
          </div>
          <div className={classes.monthSelection}>
            <button className="button" onClick={() => handleChangeMonth(false)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h2 style={{ fontWeight: "lighter" }}>
              {monthNames[currentDate.getMonth()]}
            </h2>
            <button className="button" onClick={() => handleChangeMonth(true)}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
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
              {weeksInMonth.map((weekDay, index) => {
                const dayList = setEmptyDates();
                const sliceDaysInWeeks = dayList.slice(
                  index === 0 ? 0 : 7 * index,
                  index === 0 ? 7 : 7 * index + 7
                );

                return (
                  <tr key={index}>
                    {sliceDaysInWeeks.map((day, dayIndex) => {
                      let rentedDates = [];
                      if (bookedDates) {
                        for (let i = 0; i < bookedDates.length; i++) {
                          rentedDates = getDatesBetweenRentedDays(
                            bookedDates[i].from,
                            bookedDates[i].to
                          );
                          isDayBooked(rentedDates);
                        }
                      }
                      return (
                        <th key={dayIndex}>
                          <p
                            style={{
                              borderBottom: day.booking
                                ? "4px solid #00d14d"
                                : null,
                              color:
                                day.month != currentDate.getMonth()
                                  ? "grey"
                                  : "black",
                            }}
                            className={classes.calendarDates}
                          >
                            {day.date}
                          </p>
                        </th>
                      );

                      function isDayBooked(rentedDates: any) {
                        for (let j = 0; j < rentedDates.length; j++) {
                          if (
                            rentedDates[j].getFullYear() === day.year &&
                            rentedDates[j].getMonth() === day.month &&
                            rentedDates[j].getDate() === day.date
                          ) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};
