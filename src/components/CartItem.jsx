import "@styles/components-styles/CartItem.scss";
import { useCartStore } from "../zustand/store";
import imageNotFound from "@assets/products/imagenotfound.png";

const CartItem = ({ product, selectedColor, quantity }) => {
  const { id, name, price, image } = product;
  const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
    useCartStore();

  let imageUrl = image[selectedColor];

  return (
    <>
      <div className="cart-item-container">
        <div className="cart-item-left">
          {/* kada dodam slike u productsData promeni img na image */}
          {imageUrl ? (
            <img src={imageUrl} alt="" />
          ) : (
            <img src={imageNotFound} alt="" />
          )}
          <p className="cart-name">{name}</p>
        </div>
        {/* <p>{color[selectedColor]}</p> */}
        <div className="count-handler">
          <p className="cart-price">{price} din.</p>
          <button
            onClick={() => addItemToCart({ ...product, selectedColor: id })}
          >
            +
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button onClick={() => removeItemFromCart(id)}>-</button>
          <button onClick={() => deleteItemFromCart(id)}>x</button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
