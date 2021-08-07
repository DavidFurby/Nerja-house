import firebase from "firebase/app"
import "firebase/firestore"
import initFirebase from "../../firebase/initFirebase";

initFirebase();

const UseBooking = () => {

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
                return bookedDatesInformation


            } catch (err) {
                (err);
            }
        }
    }
    
    const addNewBooking = async (booking) => {
        (booking)
        try {
            firebase.firestore().collection("bookedDates").add(booking);
            return { success: true, msg: "Ny bokning har lagts till" }
        } catch (err) {
            return { success: false, msg: err }
        }
    }

    return { fetchBookings, addNewBooking }
}

export { UseBooking }


