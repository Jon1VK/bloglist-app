import { useState } from "react";
import blogService from "../services/blogs";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const BlogForm = ({ onSuccess, onError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    blogService
      .create(title, author, url)
      .then((blog) => {
        setTitle("");
        setAuthor("");
        setUrl("");
        onSuccess(blog);
      })
      .catch(onError);
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
