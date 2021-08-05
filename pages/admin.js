import React, { useEffect, useState } from "react";
import { Calendar } from "../components/Calendar";
import { UseBooking } from "../utils/firebase/context/BookingContext";

const Admin = () => {
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let { addNewBooking, bookedDates } = UseBooking();
    let [loading, setLoading] = useState(false);
    let [minimumDate, setMinimumDate] = useState("");

    const setDates = () => {
        let minimumDate = new Date();
        const year = minimumDate.getFullYear();
        let month = minimumDate.getMonth() + 1;
        month = ifSingleDigit(month);
        let day = minimumDate.getDate();
        day = ifSingleDigit(day);
        minimumDate = year + "-" + month + "-" + day;
        setMinimumDate(minimumDate);
        setStartDate(minimumDate);
        setEndDate(minimumDate);
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

        const from = sliceDate(startDate)
        const to = sliceDate(endDate)
        const booking = { from, to }
        addNewBooking(booking);
    }

    const sliceDate = (date) => {
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


    useEffect(() => {
        setDates();
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

                    <Calendar bookedDates={bookedDates} />
                </section>
                <form onSubmit={handleNewBooking}>
                    <div>
                        <label>
                            start datum
                            <input type="date" min={minimumDate} value={startDate} onChange={(startDate) => handleChangeDate(startDate, true)} />
                        </label>


                    </div>
                    <div>
                        <label>
                            slut datum
                            <input type="date" min={minimumDate} value={endDate} onChange={(endDate) => handleChangeDate(endDate, false)} />
                        </label>
                    </div>

                    <input type="submit" value="Lägg till en ny bokning" />
                </form>
            </div>}

        </>

    )
}

export default Admin