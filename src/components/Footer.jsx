import "@styles/components-styles/Footer.scss";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  let navigate = useNavigate();
  return (
    <>
      <footer className="footer-wrapper">
        <div className="footer-social-icons">
          <a href="https://www.instagram.com/birajunikat" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-instagram"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M16.5 7.5l0 .01" />
            </svg>
          </a>
          <a href="" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-facebook"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
            </svg>
          </a>

          <a href="" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-tiktok"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
            </svg>
          </a>
          <a href="" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-youtube"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
              <path d="M10 9l5 3l-5 3z" />
            </svg>
          </a>
        </div>
        <div className="footer-header-links">
          <ul>
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              Početna
            </li>
            <li
              onClick={() => {
                navigate("/shop");
              }}
            >
              Prodavnica
            </li>
            <li
              onClick={() => {
                navigate("/blog");
              }}
            >
              Blog
            </li>
            <li
              onClick={() => {
                navigate("/cart");
              }}
            >
              Korpa
            </li>
          </ul>
        </div>
        <div className="footer-copyright">
          <p>
            Copyright &copy;2024; Designed by{" "}
            <a href="https://github.com/asimic98" target="_blank">
              asimic98
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
