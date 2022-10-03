import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import blogService from "./services/blogs";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    blogService.getAll().then((data) => setBlogs(data));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user.data);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    return <Login setUser={setUser} notify={notify} />;
  };

  const displayUserInfo = () => {
    return <UserInfo user={user} logout={handleLogout} />;
  };

  const createBlog = () => {
    return <NewBlog blogs={blogs} setBlogs={setBlogs} user={user} />;
  };

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleLogout = () => {
    setUser(null);
    notify("Logged out");
  };

  return (
    <div>
      <Notification message={notification} />
      {user === null && loginForm()}
      {user !== null && displayUserInfo()}
      {user !== null && createBlog()}
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
