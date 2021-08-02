import { Calendar } from "../components/Calendar"
import { useBooking } from "../utils/firebase/context/BookingContext";

const booking = () => {
    let { bookedDates } = useBooking();

    return (
        <>
            {bookedDates.length > 0 ? <div className="container">
                <h2>Boka tid hos oss</h2>
                <Calendar bookedDates={bookedDates} />
            </div> : null}

        </>
    );
}

export default booking;