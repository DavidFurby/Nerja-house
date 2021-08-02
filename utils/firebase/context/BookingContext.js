import firebase from "firebase/app"
import "firebase/firestore"
import React, { useContext, useState, useEffect, createContext } from "react";
import initFirebase from "../../firebase/initFirebase";

initFirebase();

const useBooking = () => {
    const [bookedDates, setBookedDates] = useState([]);

   

    async function fetchBookings() {
        const dates = await firebase.firestore().collection("bookedDates").get();
        if (dates) {
            try {
                const bookedDatesInformation = dates.docs.map((date) => {
                    let from = date.data().from.toDate()
                    let to = date.data().to.toDate()
                    const data = { from, to }
                    const id = date.id;
                    return { id, ...data };
                });
                setBookedDates(bookedDatesInformation)


            } catch (err) {
                (err);
            }
        }
    }
    useEffect(() => {
        fetchBookings();
    }, [])
    return { bookedDates }
}

export { useBooking }


