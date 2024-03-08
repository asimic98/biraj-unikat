import "@styles/components-styles/CarouselProducts.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { productsData } from "../database/productsData";
import { useNavigate } from "react-router-dom";

const CarouselProducts = () => {
  let navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <>
      <div className="carousel-wrapper">
        <h2>Tražite kvalitet? Onda su LUX modeli za Vas!</h2>
        <Slider {...settings}>
          {productsData
            .filter((item) => item.sale === "lux")
            .map((item) => (
              <div
                onClick={() => navigate("/shop")}
                className="carousel-product-wrapper"
                key={item.id}
              >
                <div className="carousel-product-img">
                  <img src={item.image[0]} alt="" />
                </div>
                <div className="carousel-product-info">
                  <h3>{item.name}</h3>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default CarouselProducts;
