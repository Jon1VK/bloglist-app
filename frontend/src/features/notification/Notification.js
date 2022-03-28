import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "./notificationSlice";
import styles from "./notification.module.css";

const Notification = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.notification);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [dispatch, message]);

  if (!message) return null;

  return (
    <div className={`${styles.notification} ${isError && styles.error}`}>
      {message}
    </div>
  );
};

export default Notification;
