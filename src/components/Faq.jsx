import "@styles/components-styles/Faq.scss";
import { useState } from "react";

const Faq = ({ questionText, answerText }) => {
  const [modal, setModal] = useState(false);
  const handleShowModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="qaa-field">
        <div className="qaa-title">
          <div className="qaa-modal">
            {!modal ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                viewBox="0 -960 960 960"
                width="30"
                fill="hsl(47, 100%, 98%)"
                onClick={handleShowModal}
              >
                <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                viewBox="0 -960 960 960"
                width="30"
                fill="hsl(47, 100%, 98%)"
                onClick={handleShowModal}
              >
                <path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z" />
              </svg>
            )}
          </div>
          <p onClick={handleShowModal} className="qaa-question">
            {questionText}
          </p>
        </div>
        {modal && (
          <p onClick={handleShowModal} className="qaa-answer">
            {answerText}
          </p>
        )}
      </div>
    </>
  );
};

export default Faq;
