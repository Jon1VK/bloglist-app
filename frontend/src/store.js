import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./features/blogs/blogsSlice";
import notificationReducer from "./features/notification/notificationSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
});

export default store;
