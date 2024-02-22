import "@styles/Shop.scss";
import { useStore } from "../zustand/store";

//components
import Login from "../components/Login";

const Shop = () => {
  const { login } = useStore();
  return (
    <>
      {login && <Login />}
      <div>Shop</div>
    </>
  );
};

export default Shop;
