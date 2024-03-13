import "@styles/Cart.scss";
import { useStore, useCartStore } from "../zustand/store";
import { useEffect, useState } from "react";
import { productsData } from "../database/productsData";
import { useNavigate } from "react-router-dom";

//components
import Login from "@components/Login";
import CartItem from "@components/CartItem";
import OrderForm from "@components/OrderForm";

const Cart = () => {
  const { login } = useStore();
  const { cartItems, getTotalAmount, totalAmount } = useCartStore();
  let navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getTotalAmount();
  }, [cartItems, getTotalAmount]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "RSD",
  });

  return (
    <>
      {login && <Login />}
      <div className="cart-items-container">
        <div>
          <h1>Vaši proizvodi u korpi:</h1>
        </div>
        <div className="cart-items">
          {productsData.map((product) => {
            const cartItem = cartItems.find((item) => item.id === product.id);
            if (cartItem && cartItem.quantity > 0) {
              return (
                <CartItem
                  key={product.id}
                  product={product}
                  selectedColor={cartItem.selectedColor}
                  quantity={cartItem.quantity}
                />
              );
            }
            return null;
          })}
        </div>
        {totalAmount > 0 ? (
          <div className="cart-footer">
            <p className="cart-amount">
              Ukupno: <span>{formatter.format(totalAmount)}</span>
            </p>
            <div className="cart-buttons">
              <button
                onClick={() => {
                  navigate("/shop");
                }}
              >
                Nastavi Kupovinu
              </button>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                Poruči
              </button>
            </div>
            {showForm && (
              <div className="order-form">
                <OrderForm />
              </div>
            )}
          </div>
        ) : (
          <p>Nemate dodatih proizvoda u vašoj korpi!!!</p>
        )}
      </div>
    </>
  );
};

export default Cart;
