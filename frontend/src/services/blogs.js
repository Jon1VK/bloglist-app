import axios from "axios";
const baseUrl = "/api/blogs/";

const getAllBlogs = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createBlog = (title, author, url) => {
  return axios
    .post(baseUrl, { title, author, url })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const updateBlogLikes = (id, likes) => {
  return axios
    .put(baseUrl + id, { likes })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const deleteBlog = (id) => {
  return axios.delete(baseUrl + id);
};

const blogService = {
  getAll: getAllBlogs,
  create: createBlog,
  updateLikes: updateBlogLikes,
  delete: deleteBlog,
};

export default blogService;
