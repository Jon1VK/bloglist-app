import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../notification/notificationSlice";
import { updateBlog, deleteBlog } from "./blogsSlice";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeBlog = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
      .unwrap()
      .then(dispatch(setNotification(`You liked blog ${blog.title}`)));
  };

  const removeBlog = () => {
    dispatch(deleteBlog(blog))
      .unwrap()
      .then(dispatch(setNotification(`You deleted blog ${blog.title}`)));
  };

  const detailsStyle = {
    display: visible ? "block" : "none",
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      <div className="blog__details" style={detailsStyle}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={likeBlog}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.id === user.id && (
          <div>
            <button onClick={removeBlog}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
