import "aos/dist/aos.css";
import AdminLogin from "../components/adminLogin";
import { Calendar } from "../components/Calendar";
import { useEffect, useState } from "react";
import AOS from "aos";
import { UseAuth } from "../utils/firebase/context/AuthContext";
import classes from "../styles/booking.module.css";

const Admin = () => {
  let [loading, setLoading] = useState<boolean>(true);
  let { currentUser } = UseAuth();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    setTimeout(() => {
      setLoading(false);
    }, 200);

    setTimeout(() => {}, 2000);
  }, []);
  let admin =
    currentUser !== null ? (
      <section className={classes.container}>
        <Calendar />
      </section>
    ) : (
      <AdminLogin />
    );
  return <>{!loading ? admin : null}</>;
};

export default Admin;
