import "@styles/Error.scss";

const Error = () => {
  return (
    <>
      <div className="error-wrapper">
        <div className="error">
          <h1>Stranica nije pronđena :&#40;</h1>
          <p>
            Vrati se na <a href="/">Početnu</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Error;
