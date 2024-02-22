import "@styles/Product.scss";
import { useStore } from "../zustand/store";

//components
import Login from "../components/Login";

const Product = () => {
  const { login } = useStore();
  return (
    <>
      {login && <Login />}
      <div>Product</div>
    </>
  );
};

export default Product;
