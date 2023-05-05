import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";

interface Booking {
  from: Date;
  to: Date;
}

interface BookingWithId extends Booking {
  id: string;
}

interface AddBookingResult {
  success: boolean;
  msg: string;
}

const UseBooking = () => {
  let [bookings, setBookings] = useState<BookingWithId[]>([]);

  const fetchBookings = async () => {
    await firebase
      .firestore()
      .collection("bookedDates")
      .get()
      .then((e) => {
        const bookedDatesInformation = e.docs.map((date) => {
          let from = new Date(date.data().from.seconds * 1000);
          let to = new Date(date.data().to.seconds * 1000);
          const data = { from, to };
          const id = date.id;
          return { id, ...data };
        });
        setBookings(bookedDatesInformation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewBooking = async (booking: Booking): Promise<AddBookingResult> => {
    booking;
    try {
      await firebase
        .firestore()
        .collection("bookedDates")
        .add(booking);
      return { success: true, msg: "Ny bokning har lagts till" };
    } catch (err) {
      return { success: false, msg: err };
    }
  };

  useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      fetchBookings();
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return { bookings, addNewBooking };
};

export { UseBooking };
