import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setNotification,
  setErrorNotification,
} from "../notification/notificationSlice";
import { createBlog } from "./blogsSlice";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const BlogForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }))
      .unwrap()
      .then(() => {
        dispatch(
          setNotification(`A new blog ${title} by ${author} was created`)
        );
        onSuccess();
        setTitle("");
        setAuthor("");
        setUrl("");
      })
      .catch((error) => {
        dispatch(setErrorNotification(error.message));
      });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label>
        Title:{" "}
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <label>
        Author:{" "}
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>
      <label>
        Url:{" "}
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>
      <input type="submit" value="Create" />
    </form>
  );
};

export default BlogForm;
