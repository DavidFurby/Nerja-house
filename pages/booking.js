import { Calendar } from "../components/Calendar"
import { UseBooking } from "../utils/firebase/context/BookingContext";
import classes from "../styles/booking.module.css"
const booking = () => {
    let { bookedDates } = UseBooking();
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