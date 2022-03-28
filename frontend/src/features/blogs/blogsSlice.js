import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => await blogService.getAll()
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (newBlog) => await blogService.create(newBlog)
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (updatedBlog) => await blogService.update(updatedBlog)
);

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (blog) => {
  await blogService.delete(blog);
  return blog;
});

export const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  extraReducers: {
    [fetchBlogs.fulfilled]: (state, action) => action.payload,
    [createBlog.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [updateBlog.fulfilled]: (state, action) => {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    [deleteBlog.fulfilled]: (state, action) => {
      const deletedBlog = action.payload;
      return state.filter((blog) => blog.id !== deletedBlog.id);
    },
  },
});

const blogsReducer = blogsSlice.reducer;

export default blogsReducer;
