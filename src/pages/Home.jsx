import "@styles/Home.scss";

import { useStore } from "../zustand/store";
import Login from "../components/Login";

const Home = () => {
  const { login } = useStore();

  return (
    <>
      {login && <Login />}
      <div className="home">
        <div className="pageone"></div>
        <div className="pagetwo"></div>
        <div className="pagethree"></div>
      </div>
    </>
  );
};

export default Home;
