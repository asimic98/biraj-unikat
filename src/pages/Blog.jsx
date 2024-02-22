import "@styles/Blog.scss";
import { useStore } from "../zustand/store";

//components
import Login from "../components/Login";

const Blog = () => {
  const { login } = useStore();
  return (
    <>
      {login && <Login />}
      <div>Blog</div>
    </>
  );
};

export default Blog;
