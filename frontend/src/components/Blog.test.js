import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

jest.mock("../services/blogs", () => ({
  __esModule: true,
  default: {
    updateLikes: () => Promise.resolve(),
  },
}));

describe(Blog, () => {
  let blogContainer, handleBlogUpdate, handleBlogDelete;

  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "example.com",
    likes: 5,
    user: {
      id: 1,
      name: "Test User",
    },
  };

  beforeEach(() => {
    handleBlogUpdate = jest.fn();
    handleBlogDelete = jest.fn();
    blogContainer = render(
      <Blog
        blog={blog}
        user={blog.user}
        onBlogUpdate={handleBlogUpdate}
        onBlogDelete={handleBlogDelete}
      />
    ).container;
  });

  test("Renders blog's title, author, url, likes and user's name", () => {
    expect(blogContainer).toHaveTextContent(blog.title);
    expect(blogContainer).toHaveTextContent(blog.author);
    expect(blogContainer).toHaveTextContent(blog.url);
    expect(blogContainer).toHaveTextContent(blog.likes);
    expect(blogContainer).toHaveTextContent(blog.user.name);
  });

  test("By default hides blog's details", () => {
    const blogDetails = blogContainer.querySelector(".blog__details");
    expect(blogDetails).toHaveStyle("display: none");
  });

  test("After clicking 'view'-button shows blog's details", () => {
    const button = screen.getByText("view");
    userEvent.click(button);
    const blogDetails = blogContainer.querySelector(".blog__details");
    expect(blogDetails).toHaveStyle("display: block");
  });

  test("After clicking the like button twice, the onBlogUpdate callback is called twice", () => {
    const button = screen.getByText("like");
    userEvent.click(button);
    userEvent.click(button);
    waitFor(() => expect(handleBlogUpdate.mock.calls).toHaveLength(2));
  });
});
