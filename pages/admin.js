import React, { useState } from "react";
import { UseBooking } from "../utils/firebase/context/BookingContext";

const Admin = () => {
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let { addNewBooking } = UseBooking();

    const handleNewBooking = (e) => {
        e.preventDefault();
        const from = startDate;
        const to = endDate;
        const booking = { from, to }
        console.log(booking)
        addNewBooking(booking);
    }
    const handleChangeDate = (date, type) => {
        date = date.target.value;
        const year = date.slice(0, 4);
        const month = date.slice(5, 7)
        const day = date.slice(8, 11);
        date = new Date(year, month - 1, day);
        if (type) {
            setStartDate(date)

        } else {
            setEndDate(date)
        }


    }

    return (
        <div>
            <div>
                <p>adminPage</p>
            </div>
            <form onSubmit={handleNewBooking}>
                <section>
                    <label>
                        start datum
                        <input type="date" value={startDate} onChange={(startDate) => handleChangeDate(startDate, true)} />
                    </label>

                    <label>
                        slut datum
                        <input type="date" value={endDate} onChange={(endDate) => handleChangeDate(endDate, false)} />
                    </label>
                </section>
                <input type="submit" value="Lägg till en ny bokning" />
            </form>
        </div>
    )
}

export default Admin