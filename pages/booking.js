import { Calendar } from "../components/Calendar"
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css"
const booking = () => {
    let { bookedDates } = UseBooking();

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
    return (
        <>
            {bookedDates ?
                <div className={classes.container}>
                    <Calendar bookedDates={bookedDates} getDatesBetweenRentedDays={getDatesBetweenRentedDays} />
                </div> : null}

        </>
    );
}

export default booking;