import "@styles/Product.scss";
import { useStore } from "../zustand/store";
import { productsData } from "../database/productsData";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/store";
import { useEffect, useState } from "react";
import { faqData } from "../database/faqData.js";

//components
import Login from "@components/Login";
import Loader from "@components/Loader";
import Faq from "@components/Faq";

//images
import imageNotFound from "@assets/products/imagenotfound.png";

const Product = () => {
  const { login } = useStore();
  const { id } = useParams();
  let navigate = useNavigate();
  const [singleProduct, setSingleProduct] = useState(null);

  const { cartItems, addItemToCart } = useCartStore();

  const [index, setIndex] = useState(0);
  const handleTab = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    const findProduct = productsData.find((item) => item.id === parseInt(id));
    setSingleProduct(findProduct);
  }, [id]);
  return (
    <>
      {login && <Login />}
      <div className="single-product-wrapper">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="back-button"
        >
          Nazad
        </button>
        {singleProduct ? (
          <div
            //proveri da li su potrebne ove klase
            className={`single-product-container ${
              singleProduct.sale === "bestsellers" ? "single-bestsellers" : ""
            } ${singleProduct.sale === "lux" ? "single-lux" : ""} ${
              singleProduct.sale === "specijalna" ? "single-special-offer" : ""
            }`}
          >
            <div className="single-product-img">
              {singleProduct.image.length > 1 ? (
                <img loading="lazy" src={singleProduct.image[index]} alt="" />
              ) : (
                <img loading="lazy" src={imageNotFound} alt="" />
              )}
            </div>
            <div className="single-product-informations">
              {singleProduct.sale === "bestsellers" && (
                <span className="single-bestseller-product">BESTSELLERS</span>
              )}
              {singleProduct.sale === "lux" && (
                <p className="single-lux-product">LUX</p>
              )}
              {singleProduct.sale === "specijalna" && (
                <p className="single-special-offer-product">SPECIAL OFFER</p>
              )}
              <h2>{singleProduct.name}</h2>
              <p>{singleProduct.description}</p>
              <div className="single-item-color">
                {singleProduct.color.map((color, i) => (
                  <button
                    className={i === index ? "active" : ""}
                    onClick={() => {
                      handleTab(i);
                    }}
                    key={i}
                    style={{ background: `${color}` }}
                  ></button>
                ))}
              </div>
              <p className="single-price">{singleProduct.price} din.</p>
              <div className="single-cart-container">
                <button
                  onClick={() => {
                    addItemToCart({ ...singleProduct, selectedColor: index });
                  }}
                  className="cart"
                >
                  Dodaj u Korpu
                </button>
                {
                  <p>
                    {cartItems.find((item) => item.id === singleProduct.id) && (
                      <>
                        Dodato:{" "}
                        {
                          cartItems.find((item) => item.id === singleProduct.id)
                            .quantity
                        }
                      </>
                    )}
                  </p>
                }
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
        <div className="qaa-component">
          <div className="qaa-container">
            <div className="qaa-header">
              <h1>Najčešća pitanja:</h1>
            </div>

            {singleProduct && singleProduct.category === "slava"
              ? faqData
                  .filter((qaa) => qaa.type === "slava")
                  .map((qaa) => (
                    <Faq
                      questionText={qaa.questionText}
                      answerText={qaa.answerText}
                      key={qaa.id}
                    />
                  ))
              : faqData
                  .filter((qaa) => qaa.type === "svadba")
                  .map((qaa) => (
                    <Faq
                      questionText={qaa.questionText}
                      answerText={qaa.answerText}
                      key={qaa.id}
                    />
                  ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
