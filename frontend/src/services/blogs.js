import axios from "axios";
const baseUrl = "/api/blogs/";

const getAllBlogs = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createBlog = (newBlog) => {
  return axios
    .post(baseUrl, newBlog)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const updateBlog = (updatedBlog) => {
  return axios
    .put(baseUrl + updatedBlog.id, updatedBlog)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const deleteBlog = (blog) => {
  return axios.delete(baseUrl + blog.id);
};

const blogService = {
  getAll: getAllBlogs,
  create: createBlog,
  update: updateBlog,
  delete: deleteBlog,
};

export default blogService;
