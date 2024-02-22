import "@styles/Cart.scss";
import { useStore } from "../zustand/store";

//components
import Login from "../components/Login";

const Cart = () => {
  const { login } = useStore();
  return (
    <>
      {login && <Login />}
      <div>Cart</div>
    </>
  );
};

export default Cart;
