import "@styles/components-styles/NavBar.scss";
import logo from "@assets/birajunikatlogo-gold.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStore, useCartStore } from "../zustand/store";
import { auth } from "../firebase/config";

const NavBar = () => {
  const { toggleLogin } = useStore();
  const { cartItems } = useCartStore();

  const [menuToggle, setMenuToggle] = useState(true);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showSidebar = () => {
    setMenuToggle(!menuToggle);
  };

  const closeSidebar = () => {
    setMenuToggle(true);
  };

  const cartItemAmount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header>
        <nav className="header-navbar">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          <ul>
            <li className="hide-on-mobile">
              <Link to={"/"}>Početna</Link>
            </li>

            <li className="hide-on-mobile">
              <Link to={"/shop"}>Prodavnica</Link>
            </li>
            <li className="hide-on-mobile">
              <Link to={"/blog"}>Blog</Link>
            </li>
            <li className="hide-on-mobile">
              {auth.currentUser !== null &&
                auth.currentUser.email === "simiccode@gmail.com" && (
                  <Link to={"/createblog"}>Kreiraj Blog</Link>
                )}
            </li>
            <li className="hide-on-mobile">
              <Link to={"/cart"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  fill="hsl(47, 100%, 98%)"
                  viewBox="0 -960 960 960"
                  width="32"
                >
                  <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                </svg>
                {cartItemAmount > 0 && <>{cartItemAmount}</>}
              </Link>
            </li>
            <li className="hide-on-mobile">
              <button onClick={toggleLogin} className="login-button">
                {!currentUser ? "Prijavi se" : "Odjavi se"}
              </button>
            </li>

            <li className="menu-button" onClick={showSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26"
                fill="hsl(47, 100%, 98%)"
                viewBox="0 -960 960 960"
                width="26"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </li>
          </ul>
        </nav>

        <nav className={menuToggle ? "sidebar show" : "sidebar"}>
          <div className="sidebar-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={closeSidebar}
              height="30"
              fill="hsl(47, 100%, 98%)"
              viewBox="0 -960 960 960"
              width="30"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>

            <Link
              to={"/"}
              onClick={() => {
                closeSidebar();
              }}
            >
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <ul>
            <li>
              <Link
                to={"/"}
                onClick={() => {
                  closeSidebar();
                }}
              >
                Početna
              </Link>
            </li>

            <li>
              <Link
                to={"/shop"}
                onClick={() => {
                  closeSidebar();
                }}
              >
                Prodavnica
              </Link>
            </li>
            <li>
              <Link
                to={"/blog"}
                onClick={() => {
                  closeSidebar();
                }}
              >
                Blog
              </Link>
            </li>
            <li>
              {auth.currentUser !== null &&
                auth.currentUser.email === "simiccode@gmail.com" && (
                  <Link
                    to={"/createblog"}
                    onClick={() => {
                      closeSidebar();
                    }}
                  >
                    Kreiraj Blog
                  </Link>
                )}
            </li>
            <li>
              <Link
                to={"/cart"}
                onClick={() => {
                  closeSidebar();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  fill="hsl(47, 100%, 98%)"
                  viewBox="0 -960 960 960"
                  width="32"
                >
                  <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                </svg>
                {cartItemAmount > 0 && <>{cartItemAmount}</>}
              </Link>
            </li>
            <li>
              <button onClick={toggleLogin} className="login-button">
                {!auth.currentUser ? "Prijavi se" : "Odjavi se"}
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
