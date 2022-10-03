import { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ blogs, setBlogs, user }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      url: url,
      author: author,
      likes: 0,
    };
    const savedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(savedBlog));
    setTitle("");
    setUrl("");
    setAuthor("");
  };
  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:{" "}
          <input
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>
        <div>
          author:{" "}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
