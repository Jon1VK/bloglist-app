import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

jest.mock("../services/blogs", () => ({
  __esModule: true,
  default: {
    create: (title, author, url) =>
      Promise.resolve({
        title,
        author,
        url,
      }),
  },
}));

describe(BlogForm, () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "example.com",
  };

  test("Calls onSuccess with right details after clicking the create button", () => {
    const handleSuccess = jest.fn();
    render(<BlogForm onSuccess={handleSuccess} />);
    const titleInput = screen.getByRole("textbox", { name: /title/i });
    const authorInput = screen.getByRole("textbox", { name: /author/i });
    const urlInput = screen.getByRole("textbox", { name: /url/i });
    userEvent.type(titleInput, blog.title);
    userEvent.type(authorInput, blog.author);
    userEvent.type(urlInput, blog.url);
    const button = screen.getByRole("button");
    userEvent.click(button);
    waitFor(() => {
      expect(handleSuccess.mock.calls).toHaveLength(1);
      expect(handleSuccess.mock.calls[0][0]).toEqual(blog);
    });
  });
});
