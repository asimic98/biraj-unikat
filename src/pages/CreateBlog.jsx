import "@styles/CreateBlog.scss";
import { useStore } from "../zustand/store";

//components
import Login from "../components/Login";

const CreateBlog = () => {
  const { login } = useStore();
  return (
    <>
      {login && <Login />}
      <div>Create Blog</div>
    </>
  );
};

export default CreateBlog;
