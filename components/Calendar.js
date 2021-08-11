import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from "react";
import classes from "../styles/booking.module.css";
export const Calendar = ({ bookedDates, getDatesBetweenRentedDays }) => {
  let [currentMonth, setCurrentMonth] = useState();
  let [months, setMonths] = useState([]);
  let [loading, setLoading] = useState(true);
  let [] = useState("");
  let [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  let currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];
  const weeksInMonth = [1, 2, 3, 4, 5, 6];

  const getMonthsForYear = async (date, launch) => {
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
    if (launch) {
      getCurrentMonth(monthList, date);
    }
  };

  const getCurrentMonth = (monthList, date) => {
    const currentDate = new Date().getMonth();
    for (let i = 0; i <= monthList.length; i++) {
      if (currentDate === i) {
        for (let j = 0; j <= monthNames.length; j++) {
          if (j === currentDate) {
            setCurrentMonth({
              days: monthList[i].days,
              monthName: monthNames[j],
              monthNumber: date.getMonth(),
            });
          }
        }
      }
    }
  };
  const handleChangeMonth = (selection) => {
    if (selection) {
      if (currentMonth.monthNumber < 11) {
        setCurrentMonth({
          monthName: monthNames[currentMonth.monthNumber + 1],
          monthNumber: currentMonth.monthNumber + 1,
          days: months[currentMonth.monthNumber + 1].days,
        });
      } else {
        setCurrentMonth({
          monthName: monthNames[0],
          monthNumber: 0,
          days: months[0].days,
        });
        setCurrentYear(currentYear + 1);
        let newYear = new Date(currentYear + 1, 0, 1);
        getMonthsForYear(newYear, false);
      }
    } else {
      if (currentMonth.monthNumber > 0) {
        setCurrentMonth({
          monthName: monthNames[currentMonth.monthNumber - 1],
          monthNumber: currentMonth.monthNumber - 1,
          days: months[currentMonth.monthNumber - 1].days,
        });
      } else {
        setCurrentMonth({
          monthName: monthNames[11],
          monthNumber: 11,
          days: months[11].days,
        });
        setCurrentYear(currentYear - 1);
        let pastYear = new Date(currentYear - 1, 12, 0);
        getMonthsForYear(pastYear, false);
      }
    }
  };
  const setEmptyDates = () => {
    const daysInMonth = months[currentMonth.monthNumber].days;
    let dayList = [];
    for (let i = 0; i < daysInMonth.length; i++) {
      const fillerPositions = daysInMonth[i].day === 0 ? 6 : daysInMonth[i].day;
      if (i === 0 && daysInMonth[i].day !== 1) {
        for (let j = 0; j < fillerPositions; j++) {
            const prevMonth = currentMonth.monthNumber === 0 ? months[currentMonth.monthNumber + 11].days : months[currentMonth.monthNumber - 1].days;            
          dayList.push(prevMonth[prevMonth.length - fillerPositions + j]);
        }
        dayList.push(daysInMonth[i]);
      } else if (i === daysInMonth.length - 1) {
        dayList.push(daysInMonth[i]);
        const remainingDays = 7 - daysInMonth[i].day;
        for (let t = 0; t <= remainingDays; t++) {
            const nextMonth = months[currentMonth.monthNumber + 1].days;
          dayList.push(nextMonth[t]);
          if(t === remainingDays && nextMonth[t].day !== 6) {
              for(let r = 1; r <= 7 - nextMonth[t].day; r++) {
                dayList.push(nextMonth[t + r]);
              }
          }
        }
      } else {
        dayList.push(daysInMonth[i]);
      }
    }
    return dayList;
  };

  useEffect(() => {
    getMonthsForYear(currentDate, true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
  return (
    <>
      {!loading ? (
        <div className={classes.calendarContainer}>
          <section style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{fontWeight: "lighter"}}>{currentYear}</h1>
          </section>
          <section className={classes.monthSelection}>
            <button
              className="button"
              onClick={() => handleChangeMonth(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h2 style={{fontWeight: "lighter"}}>{currentMonth.monthName}</h2>
            <button
              className="button"
              onClick={() => handleChangeMonth(true)}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </section>
          <table className={classes.calendar}>
            <thead>
              <tr>
                {weekDays.map((weekDay, index) => {
                  return (
                    <th key={index}>
                      <h4 style={{fontWeight: "normal"}}>{weekDay}</h4>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {weeksInMonth.map((weekDay, index) => {
                const dayList = setEmptyDates(weekDay);
                const sliceDaysInWeeks = dayList.slice(
                  index === 0 ? 0 : 7 * index,
                  index === 0 ? 7 : 7 * index + 7
                );

                return (
                  <tr key={index}>
                    {sliceDaysInWeeks.map((day, dayIndex) => {
                      for (let i = 0; i < bookedDates.length; i++) {
                        const rentedDates = getDatesBetweenRentedDays(
                          bookedDates[i].from,
                          bookedDates[i].to
                        );
                        for (let j = 0; j < rentedDates.length; j++) {
                          if (
                            rentedDates[j].getFullYear() === day.year &&
                            rentedDates[j].getMonth() === day.month &&
                            rentedDates[j].getDate() === day.date
                          ) {
                            day.booking = true;
                          }
                        }
                      }

                      return (
                        <th key={dayIndex}>
                          <p style={{ borderBottom: day.booking ? "4px solid #00d14d" : null }} className={classes.calendarDates}>
                            {day.date}
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
    </>
  );
};
