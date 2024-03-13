import "@styles/Home.scss";
import { useStore } from "../zustand/store";

//components
import ImageGallery from "@components/ImageGallery";
import CarouselProducts from "@components/CarouselProducts";
import Login from "@components/Login";

const Home = () => {
  const { login } = useStore();

  return (
    <>
      {login && <Login />}
      <div className="home-wrapper">
        <div className="home-banner">
          <h1>Teodorin kreativni kutak</h1>
        </div>

        <div className="about-me">
          <div className="about-me-img"></div>
          <div className="about-me-text">
            <h2>Dobrodošli u Teodorin kreativni kutak!</h2>
            <p>
              Mesto gde nastaju unikatni stakleni komadi, oplemenjeni ljubavlju,
              da upotpune vaše važne datume i prilike. Ja sam tu da ispunim sve
              želje i da zajedničkim snagama inspiraciju pretvorimo u kreaciju!
              <br></br>
              Sa preko 500 isporuka širom teritorije Srbije i BIH, vaše
              zadovoljstvo je moja najveća motivacija. Najponosnija sam na
              poznanstva koja stičem i na odnose koje gradim sa vama, a najviše
              me ispunjava osećaj da se zadovoljni vraćate.<br></br>
              Dozvolite mi da unesem čaroliju u vaše posebne trenutke. Hajde da
              zajedno stvaramo unikate!
            </p>
          </div>
        </div>

        <div className="gallery-img">
          <ImageGallery />
        </div>

        

        <div className="carousel-products">
          <CarouselProducts />
        </div>
      </div>
    </>
  );
};

export default Home;
