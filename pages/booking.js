import { Calendar } from "../components/Calendar"
import { useBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css"
const booking = () => {
    let { bookedDates } = useBooking();
    console.log(bookedDates)
    return (
        <>
            {bookedDates.length > 0 ?
                <div className={classes.container}>
                    <Calendar bookedDates={bookedDates} />
                </div> : null}

        </>
    );
}

export default booking;