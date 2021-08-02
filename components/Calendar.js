import React from "react";
import { useState, useEffect } from "react";

import classes from "../styles/booking.module.css";

export const Calendar = ({bookedDates}) => {
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
        let currentYear = date.getFullYear();
        let monthList = [];
        for (let i = 0; i <= 12; i++) {
            let date = new Date(currentYear, i + 1, 0);
            let dayList = [];
            for (let j = 1; j <= date.getDate(); j++) {
                let currentDate = new Date(currentYear, i, j)
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

    const getDatesBetweenRentedDays = (from, to) => {
        const dates = [];
        let currentDate = from;
        const addDays = function (days) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days)
            return date
        }
        while (currentDate <= to) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1)
        }
        return dates;
    }

    const getCurrentMonth = (monthList, date) => {
        let currentDate = new Date().getMonth();
        for (let i = 0; i <= monthList.length; i++) {
            if (currentDate === i) {
                for (let j = 0; j <= monthNames.length; j++) {
                    if (j === currentDate) {
                        setCurrentMonth({ days: monthList[i].days, monthName: monthNames[j], monthNumber: date.getMonth() })
                    }
                }
            }
        }
    }
    const handleChangeMonth = (selection) => {
        if (selection) {
            if (currentMonth.monthNumber < 11) {
                setCurrentMonth(
                    {
                        monthName: monthNames[currentMonth.monthNumber + 1],
                        monthNumber: currentMonth.monthNumber + 1,
                        days: months[currentMonth.monthNumber + 1].days,
                    }
                )
            } else {
                setCurrentMonth(
                    {
                        monthName: monthNames[0], monthNumber: 0, days: months[0].days
                    }
                )
                setCurrentYear(currentYear + 1)
                let newYear = new Date(currentYear + 1, 0, 1)
                getMonthsForYear(newYear, false)
            }


        } else {
            if (currentMonth.monthNumber > 0) {
                setCurrentMonth(
                    {
                        monthName: monthNames[currentMonth.monthNumber - 1],
                        monthNumber: currentMonth.monthNumber - 1,
                        days: months[currentMonth.monthNumber - 1].days,
                    }

                );
            } else {
                setCurrentMonth({
                    monthName: monthNames[11], monthNumber: 11, days: months[11].days

                })
                setCurrentYear(currentYear - 1);
                let pastYear = new Date(currentYear - 1, 12, 0)
                getMonthsForYear(pastYear, false)
            }


        }
    };
    const setEmptyDates = () => {
        const days = months[currentMonth.monthNumber].days;
        let dayList = [];
        for (let i = 0; i < days.length; i++) {
            const fillerPositions = days[i].day === 0 ? 6 : days[i].day
            if (i === 0 && days[i].day !== 1) {
                for (let j = 0; j < fillerPositions; j++) {
                    dayList.push("");
                }
                dayList.push(days[i]);
            } else if (i === days.length - 1 && days[i].day !== 0) {
                dayList.push(days[i]);

                let remainingWeek = 7 - days[i].day
                for (let t = 0; t < remainingWeek; t++) {
                    dayList.push("");
                }
            }
            else {
                dayList.push(days[i])
            }
        }
        return dayList;
    }

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
                        <p>{currentYear}</p>
                    </section>
                    <section className={classes.monthSelection}>
                        <button onClick={() => handleChangeMonth(false)}><p>left</p></button>
                        <p>{currentMonth.monthName}</p>
                        <button onClick={() => handleChangeMonth(true)}><p>right</p></button>
                    </section>

                    <table className={classes.calendar}>
                        <thead>
                            <tr>
                                {weekDays.map((weekDay, index) => {
                                    return <th key={index}><p>{weekDay}</p></th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {weeksInMonth.map((weekDay, index) => {

                                const dayList = setEmptyDates(weekDay);
                                const sliceDaysInWeeks = dayList.slice(index === 0 ? 0 : 7 * index, index === 0 ? 7 : 7 * index + 7);

                                return <tr key={index}>{sliceDaysInWeeks.map((day, dayIndex) => {
                                    for (let i = 0; i < bookedDates.length; i++) {
                                        const rentedDates = getDatesBetweenRentedDays(bookedDates[i].from, bookedDates[i].to);
                                        for (let j = 0; j < rentedDates.length; j++) {
                                            if (rentedDates[j].getFullYear() === day.year && rentedDates[j].getMonth() === day.month && rentedDates[j].getDate() === day.date) {
                                                day.booking = true;
                                            }
                                        }
                                    }

                                    return <th key={dayIndex}><p style={{ color: day.booking ? "green" : "red" }}>{day.date}</p></th>
                                })}</tr>
                            })}

                        </tbody>
                    </table>
                </div>
            ) : null}

        </>
    );
}


