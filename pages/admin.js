import React, { useEffect, useState } from "react";
import { Calendar } from "../components/Calendar";
import { UseBooking } from "../utils/firebase/context/BookingContext";

const Admin = () => {
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let { addNewBooking, fetchBookings } = UseBooking();
    let [loading, setLoading] = useState(false);
    let [minimumDate, setMinimumDate] = useState("");
    let [bookedDates, setBookedDates] = useState([]);

    const setDates = () => {
        let minimumDate = new Date();
        const year = minimumDate.getFullYear();
        let month = minimumDate.getMonth() + 1;
        month = ifSingleDigit(month);
        let day = minimumDate.getDate();
        day = ifSingleDigit(day);
        minimumDate = year + "-" + month + "-" + day;
        setMinimumDate(minimumDate);
    }
    const ifSingleDigit = (number) => {
        if (number.toString().length < 2) {
            return 0 + number.toString();
        } else {
            return
        }
    }
    const handleNewBooking = (e) => {
        e.preventDefault();

        if (startDate.length && endDate.length) {
            const from = toDateType(startDate)
            const to = toDateType(endDate)

            for (let i = 0; i < bookedDates.length; i++) {
                const rentedDates = getDatesBetweenRentedDays(bookedDates[i].from, bookedDates[i].to);
                console.log(rentedDates)
                if (rentedDates[i].getTime() === from.getTime() || rentedDates[i].getTime() === to.getTime()) {
                    return alert("tid redan bokad")
                }
            }
            const booking = { from, to }
            addNewBooking(booking);
            alert("bokning lagd")
        } else {
            alert("måste ange ett datum för start och slut av bokning")
        }
    }

    const toDateType = (date) => {
        let year = date.slice(0, 4);
        let month = date.slice(5, 7)
        let day = date.slice(8, 11);
        return new Date(year, month - 1, day);
    }
    const handleChangeDate = (date, type) => {
        date = date.target.value;
        (date);

        if (type) {
            setStartDate(date)

        } else {
            setEndDate(date)
        }
    }

    const getDatesBetweenRentedDays = (from, to) => {
        const dates = [];
        let currentDate = from;
        if (from.getTime() !== to.getTime()) {
            const addDays = function (days) {
                const date = new Date(this.valueOf());
                date.setDate(date.getDate() + days)
                return date
            }
            while (currentDate <= to) {
                dates.push(currentDate);
                currentDate = addDays.call(currentDate, 1)
            }
        } else {
            dates.push(from)
            dates.push(to)
        }
        console.log(dates); 
        return dates;

    }

    const getBookedDates = async () => {
        const tempBookings = await fetchBookings();
        if (tempBookings) {
            setBookedDates(tempBookings);
        }
    }
    useEffect(() => {
        setDates();
        getBookedDates();
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, []);
    return (
        <>
            {loading ? null : <div>
                <div>
                    <p>adminPage</p>
                </div>
                <section>

                    <Calendar bookedDates={bookedDates} getDatesBetweenRentedDays={getDatesBetweenRentedDays} />
                </section>
                <form onSubmit={handleNewBooking}>
                    <div>
                        <label>
                            start datum
                            <input type="date" min={minimumDate} max={endDate} value={startDate} onChange={(startDate) => handleChangeDate(startDate, true)} />
                        </label>


                    </div>
                    <div>
                        <label>
                            slut datum
                            <input type="date" min={startDate ? startDate : minimumDate} value={endDate} onChange={(endDate) => handleChangeDate(endDate, false)} />
                        </label>
                    </div>

                    <input type="submit" value="Lägg till en ny bokning" />
                </form>
            </div>}

        </>

    )
}

export default Admin