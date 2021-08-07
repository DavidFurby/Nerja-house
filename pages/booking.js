import { Calendar } from "../components/Calendar"
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css"
import { useEffect, useState } from "react";
const booking = () => {
    let { fetchBookings } = UseBooking();
    let [loading, setLoading] = useState(false);
    let [bookedDates, setBookedDates] = useState([]); 

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
    const getBookedDates = async () => {
        const tempBookings = await fetchBookings();
        if(tempBookings) {
            console.log(tempBookings)
            setBookedDates(tempBookings); 
        }
    }
    useEffect(() => {
        getBookedDates();
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [])
    return (
        <>
            {loading ?
                <div className={classes.container}>
                    <Calendar bookedDates={bookedDates} getDatesBetweenRentedDays={getDatesBetweenRentedDays} />
                </div> : <p>missing</p>}

        </>
    );
}

export default booking;