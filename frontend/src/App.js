import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const nullNotification = { message: null, isError: false };
const TIMEOUT_MS = 5000;

const App = () => {
  const [notification, setNotification] = useState(nullNotification);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      loginService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(setBlogs);
  }, []);

  const logoutUser = () => {
    loginService.logout();
    setUser(null);
  };

  const createNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(nullNotification), TIMEOUT_MS);
  };

  const handleBlogFormSuccess = (blog) => {
    blogFormRef.current.toggleVisibility();
    setBlogs([...blogs, blog]);
    createNotification(
      `A new blog ${blog.title} by ${blog.author} was created`
    );
  };

  const handleBlogUpdate = (updatedBlog) => {
    const index = blogs.findIndex((blog) => blog.id === updatedBlog.id);
    setBlogs([
      ...blogs.slice(0, index),
      updatedBlog,
      ...blogs.slice(index + 1),
    ]);
  };

  const handleBlogDelete = (id) => {
    const index = blogs.findIndex((blog) => blog.id === id);
    setBlogs([...blogs.slice(0, index), ...blogs.slice(index + 1)]);
  };

  return user ? (
    <>
      <h2>Blogs</h2>
      <Notification
        message={notification.message}
        isError={notification.isError}
      />
      <p>
        {user.name} logged in <button onClick={logoutUser}>logout</button>
      </p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm
          onSuccess={handleBlogFormSuccess}
          onError={(error) => createNotification(error.message, true)}
        />
      </Togglable>
      {[...blogs]
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            onBlogUpdate={handleBlogUpdate}
            onBlogDelete={handleBlogDelete}
          />
        ))}
    </>
  ) : (
    <>
      <h2>Log in to application</h2>
      <Notification
        isError={notification.isError}
        message={notification.message}
      />
      <LoginForm
        onSuccess={setUser}
        onError={(error) => createNotification(error.message, true)}
      />
    </>
  );
};

export default App;
