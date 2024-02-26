import "@styles/components-styles/Faq.scss";
import { useState } from "react";

const Faq = ({ questionText, answerText }) => {
  const [modal, setModal] = useState(false);
  const handleShowModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className="qaaField">
        <div className="title">
          <p>{questionText}</p>
          {!modal ? (
            <img
              className="icon"
              src={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              }
              onClick={handleShowModal}
            />
          ) : (
            <img
              className="icon"
              src={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M240-120v-80h480v80H240Z" />
                </svg>
              }
              onClick={handleShowModal}
            />
          )}
        </div>
        {modal && <p className="body">{answerText}</p>}
      </div>
    </>
  );
};

export default Faq;
