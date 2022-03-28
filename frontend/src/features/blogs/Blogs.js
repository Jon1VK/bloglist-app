import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { fetchBlogs } from "./blogsSlice";

const Blogs = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) =>
    [...state.blogs].sort((b1, b2) => b2.likes - b1.likes)
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div>
      {[...blogs].map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default Blogs;
