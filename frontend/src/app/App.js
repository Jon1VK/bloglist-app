import { useState, useEffect, useRef } from "react";
import Blogs from "../features/blogs/Blogs";
import BlogForm from "../features/blogs/BlogForm";
import LoginForm from "../components/LoginForm";
import Notification from "../features/notification/Notification";
import Togglable from "../components/Togglable";
import loginService from "../services/login";
import { setNotification } from "../features/notification/notificationSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const blogFormRef = useRef();

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      loginService.setToken(user.token);
    }
  }, []);

  const logoutUser = () => {
    loginService.logout();
    setUser(null);
  };

  const createNotification = (message, isError = false) => {
    dispatch(setNotification({ message, isError }));
  };

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  return user ? (
    <>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={logoutUser}>logout</button>
      </p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm onSuccess={toggleBlogForm} />
      </Togglable>
      <Blogs user={user} />
    </>
  ) : (
    <>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm
        onSuccess={setUser}
        onError={(error) => createNotification(error.message, true)}
      />
    </>
  );
};

export default App;
