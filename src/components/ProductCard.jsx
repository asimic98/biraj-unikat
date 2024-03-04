import "@styles/components-styles/ProductCard.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import imageNotFound from "../assets/products/imagenotfound.png";
import { useCartStore } from "../zustand/store";

const ProductCard = ({ product }) => {
  //implement zustand state menagement
  const { cartItems, addItemToCart } = useCartStore();

  //state za sliku i kruzic u boji
  const [index, setIndex] = useState(0);
  const handleTab = (i) => {
    setIndex(i);
  };

  const { image, name } = product;

  return (
    <Link
      to={`/product/${product.id}`}
      className={`product-card ${
        product.sale === "bestsellers" ? "bestsellers" : ""
      } ${product.sale === "lux" ? "lux" : ""} ${
        product.sale === "specijalna" ? "special-offer" : ""
      }`}
    >
      {image && image.length > 0 ? (
        <img loading="lazy" src={image[index]} alt="" />
      ) : (
        <img loading="lazy" src={imageNotFound} alt="" />
      )}

      <div className="product-information">
        {product.sale === "bestsellers" && (
          <span className="bestseller-product">BESTSELLERS</span>
        )}
        {product.sale === "lux" && <p className="lux-product">LUX</p>}
        {product.sale === "specijalna" && (
          <p className="special-offer-product">SPECIAL OFFER</p>
        )}
        <h2>{name}</h2>
        <p>{product.description.slice(0, 100)}...</p>

        <div className="item-color">
          {product.color.map((color, i) => (
            <button
              className={i === index ? "active" : ""}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                handleTab(i);
              }}
              key={i}
              style={{ background: `${color}` }}
            ></button>
          ))}
        </div>

        <p className="price">{product.price} din.</p>
      </div>

      <div className="cart-container">
        <button
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            addItemToCart({ ...product, selectedColor: index });
          }}
          className="cart"
        >
          Dodaj u Korpu
        </button>
        {
          <p>
            {cartItems.find((item) => item.id === product.id) && (
              <>
                Dodato:{" "}
                {cartItems.find((item) => item.id === product.id).quantity}
              </>
            )}
          </p>
        }
      </div>
    </Link>
  );
};

export default ProductCard;
