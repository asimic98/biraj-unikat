import "@styles/Error.scss";
import { useStore } from "../zustand/store";

//components
import Login from "@components/Login";

const Error = () => {
  const { login } = useStore();
  return (
    <>
      {login && <Login />}
      <div className="error-wrapper">
        <div className="error">
          <h1>Stranica nije pronđena :&#40;</h1>
          <p>
            Vrati se na <a href="/">Početnu</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Error;
