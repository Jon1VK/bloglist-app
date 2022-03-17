import PropTypes from "prop-types";
import React, { useState } from "react";
import blogService from "../services/blogs";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, user, onBlogUpdate, onBlogDelete }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeBlog = () => {
    blogService.updateLikes(blog.id, blog.likes + 1).then(onBlogUpdate);
  };

  const deleteBlog = () => {
    blogService.delete(blog.id).then(() => onBlogDelete(blog.id));
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
            <button onClick={deleteBlog}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onBlogUpdate: PropTypes.func.isRequired,
  onBlogDelete: PropTypes.func.isRequired,
};

export default Blog;
