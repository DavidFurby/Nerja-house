import React from "react";
import { useState, useEffect } from "react";

import classes from "../styles/booking.module.css";

export const Calendar = () => {
    let [currentMonth, setCurrentMonth] = useState({});
    let [months, setMonths] = useState([]);
    let [loading, setLoading] = useState(true)
    let [] = useState("");
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

    const getMonths = async () => {
        let date = new Date();
        let year = date.getFullYear();

        let monthList = [];
        for (let i = 0; i <= 12; i++) {
            let date = new Date(year, i +1, 0);
            let dayList = [];
            for (let j = 1; j <= date.getDate(); j++) {
                let currentDate = new Date(year, i, j)
                dayList.push(currentDate);
            }
            monthList.push({ month: date.getMonth(), days: dayList });
        }
        setMonths(monthList);
        let currentDate = new Date().getMonth();
        for (let i = 0; i <= monthList.length; i++) {
            if (currentDate === i) {
                for (let j = 0; j <= monthNames.length; j++) {
                    if (j === currentDate) {
                        await setCurrentMonth({ days: monthList[i].days, monthName: monthNames[j], monthNumber: date.getMonth() })
                    }
                }
            }
        }
    };

    const handleChangeMonth = (selection) => {
        if (selection) {
            setCurrentMonth(
                currentMonth.monthNumber < 11
                    ? {
                        monthName: monthNames[currentMonth.monthNumber + 1],
                        monthNumber: currentMonth.monthNumber + 1,
                        days: months[currentMonth.monthNumber + 1].days,
                    }
                    : { monthName: monthNames[0], monthNumber: 0, days: months[0].days }
            );
        } else {
            setCurrentMonth(
                currentMonth.monthNumber > 0
                    ? {
                        monthName: monthNames[currentMonth.monthNumber - 1],
                        monthNumber: currentMonth.monthNumber - 1,
                        days: months[currentMonth.monthNumber - 1].days,

                    }
                    : { monthName: monthNames[11], monthNumber: 11, days: months[11].days }
            );
        }
    };

    useEffect(() => {
        getMonths();
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, []);


    return (
        <>
            {!loading ? (
                <div className={classes.calendarContainer}>
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
                                let days = months[currentMonth.monthNumber].days;

                                let dayList = [];
                                for (let i = 0; i < days.length; i++) {
                                    let fillerPositions = days[i].getDay() === 0 ? 6 : days[i].getDay()
                                    if (i === 0 && days[i].getDay() !== 1) {
                                        for (let j = 0; j < fillerPositions; j++) {
                                            dayList.push("");
                                        }
                                        dayList.push(days[i].getDate());
                                    } else if (i === days.length - 1 && days[i].getDay() !== 0) {
                                        dayList.push(days[i].getDate());

                                        let remainingWeek = 7 - days[i].getDay(); 
                                        for (let t = 0; t < remainingWeek; t++) {
                                            dayList.push("");
                                        }
                                    }
                                    else {
                                        dayList.push(days[i].getDate())
                                    }
                                }
                                console.log(index);
                                let sliceDaysInWeeks = dayList.slice(index === 0 ? 0 : 7 * index, index === 0 ? 7: 7 * index + 7);
                                return <tr key={index}>{sliceDaysInWeeks.map((days, dayIndex) => {
                                    return <th key={dayIndex}>{days}</th>
                                })}</tr>
                            })}

                        </tbody>
                    </table>
                </div>
            ) : null}

        </>
    );
}


