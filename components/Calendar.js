import React from 'react'
import { useState, useEffect } from 'react';

import classes from "../styles/booking.module.css"
export const Calendar = () => {
    let [currentMonthDays, setCurrentMonthDays] = useState([]);
    let [currentMonth, setCurrentMonth] = useState("");

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
    const getMonth = () => {
        let date = new Date();
        let monthNumber = date.getMonth();

        setCurrentMonth({name: monthNames[monthNumber], number: monthNumber})
        getDays(monthNumber);
    }

    const getDays = (monthNumber) => {
        let date = new Date();
        let year = date.getFullYear();
        let daysInMonth = new Date(year, monthNumber, 0).getDate();

        let temp = []
        for (let i = 0; i < daysInMonth; i++) {
            temp.push(i);
        }
        setCurrentMonthDays(temp);
    }

   const setMonth = (selection) => {
        if(selection) {
            setCurrentMonth(currentMonth.number < 11 ? {name: monthNames[currentMonth.number + 1], number: currentMonth.number + 1} : {name: monthNames[0], number: 0})
            getDays(currentMonth.number)
        } else {
            setCurrentMonth(currentMonth.number > 0 ? {name: monthNames[currentMonth.number - 1], number: currentMonth.number - 1} : {name: monthNames[11], number: 11})
            getDays(currentMonth.number)

        }
    }
    useEffect(() => {
        getMonth();
    }, [])
    return (
        <div className={classes.calendarContainer}>
            <section className={classes.monthSelection}>
                <button onClick={() => setMonth(false)}>left</button>
                <p>{currentMonth.name}</p>
                <button onClick={() => setMonth(true)}>right</button>
            </section>
            <div className={classes.calendar}>
                <div className={classes.days} >
                    {currentMonthDays.map((day, index) => {
                        return (<p key={index} style={{padding: "1rem"}}>{day}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
