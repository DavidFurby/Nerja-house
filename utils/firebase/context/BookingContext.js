import firebase from "firebase/app"
import "firebase/firestore"
import React, { useContext, useState, useEffect, createContext } from "react";
import initFirebase from "../../firebase/initFirebase";

initFirebase();

const UseBooking = () => {
    const [bookedDates, setBookedDates] = useState([]);



    const fetchBookings = async () => {
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
    const addNewBooking = async (booking) => {
        console.log(booking)
        try {
            firebase.firestore().collection("bookedDates").add(booking);
            return { success: true, msg: "Ny bokning har lagts till" }
        } catch (err) {
            return { success: false, msg: err }
        }
    }
    useEffect(() => {
        fetchBookings();
    }, [])
    return { bookedDates, addNewBooking, }
}

export { UseBooking }


