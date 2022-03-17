const Notification = ({ isError, message }) => {
  if (!message) return null;

  const notificationStyle = {
    color: isError ? "red" : "green",
    borderColor: isError ? "red" : "green",
    borderStyle: "solid",
    borderRadius: 5,
    background: "lightgrey",
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
