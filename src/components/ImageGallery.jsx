import "@styles/components-styles/ImageGallery.scss";
import Masonry from "react-responsive-masonry";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

//images
import img1 from "../assets/gallery/gallery-image1.jpeg";
import img2 from "../assets/gallery/gallery-image2.webp";
import img3 from "../assets/gallery/gallery-image3.jpeg";
import img4 from "../assets/gallery/gallery-image4.jpeg";
import img5 from "../assets/gallery/gallery-image5.jpeg";
import img6 from "../assets/gallery/gallery-image6.jpeg";
import img7 from "../assets/gallery/gallery-image7.jpeg";
import img8 from "../assets/gallery/gallery-image8.webp";
import img9 from "../assets/gallery/gallery-image9.webp";
import img10 from "../assets/gallery/gallery-image10.webp";
import img11 from "../assets/gallery/gallery-image11.webp";
import img12 from "../assets/gallery/gallery-image12.jpeg";

const ImageGallery = () => {
  const [open, setOpen] = useState(false);
  const images = [
    { src: img1 },
    { src: img2 },
    { src: img3 },
    { src: img4 },
    { src: img10 },
    { src: img5 },
    { src: img6 },
    { src: img9 },
    { src: img8 },
    { src: img7 },
    { src: img11 },
    { src: img12 },
  ];
  return (
    <>
      <div className="gallery-wrapper">
        <h2>Ponosno brojim preko 500 upotpunjenih trenutaka. Sada su to večne uspomene!</h2>
        <Masonry columnsCount={3} gutter="1rem">
          {images.map((image, i) => (
            <img
              key={i}
              src={image.src}
              onClick={() => {
                setOpen(true);
              }}
              style={{ width: "100%", display: "block" }}
            />
          ))}
        </Masonry>
        <Lightbox open={open} close={() => setOpen(false)} slides={images} />
      </div>
    </>
  );
};

export default ImageGallery;
