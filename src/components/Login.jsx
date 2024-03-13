import "@styles/components-styles/Login.scss";

// Firebase
import { auth, googleProvaider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { signOut } from "firebase/auth";
import { useStore } from "../zustand/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { toggleLogin } = useStore();

  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth) {
        toggleLogin(false);
      }
      navigate("/");
    } catch (err) {
      if (err.code === "auth/weak-password") {
        setError("Slaba lozinka! Molimo vas da izaberete jaču lozinku.");
      } else if (err.code === "auth/email-already-in-use") {
        setError(
          "E-mail je već u upotrebi. Molimo vas da izaberete drugi e-mail."
        );
      } else if (err.code === "auth/invalid-email") {
        setError(
          "Neispravan format e-maila. Molimo vas da unesete važeću e-mail adresu."
        );
      } else if (err.code === "auth/user-not-found") {
        setError(
          "Korisnik nije pronađen. Molimo vas da proverite vaše podatke ili registrujte novi nalog."
        );
      } else {
        setError(err.message);
      }
    }
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuth", true);
      if (auth) {
        toggleLogin(false);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async (e) => {
    try {
      e.preventDefault();
      await signInWithPopup(auth, googleProvaider);
      localStorage.setItem("isAuth", true);
      if (auth) {
        toggleLogin(false);
      }
      navigate("/");
      // const authInfo = {
      //   userID: result.user.uid,
      //   name: result.user.displayName,
      //   profilePhoto: result.user.photoURL,
      //   isAuth: true,
      // };
      // localStorage.setItem("auth", JSON.stringify(authInfo));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordReset = () => {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert("Email sent! Check your inbox for password reset instructions!");
  };

  const handleRegister = () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.classList.add("active");
    setError("");
  };

  const handleLogin = () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.classList.remove("active");
    setError("");
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePopup = (e) => {
    if (e.target.classList.contains("popup")) {
      toggleLogin();
    }
  };

  return (
    <>
      {auth.currentUser ? (
        <div onClick={handlePopup} className="popup">
          <div className="wrapper-logout">
            <p>Da li ste sigurni da želite da se odjavite?</p>
            <button
              onClick={() => {
                navigate("/");
                logout();
              }}
              className="login btn"
            >
              Odjavi se
            </button>
          </div>
        </div>
      ) : (
        <div onClick={handlePopup} className="popup">
          <section className="wrapper">
            <span onClick={toggleLogin} className="icon-close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </span>

            <div className="form-box login-form">
              <h2>Prijavi se</h2>
              <form action="#">
                <div className="input-box">
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-mail-filled"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    id="email-id"
                    required
                  />
                  <label htmlFor="email-id">Email</label>
                </div>

                <div className="input-box">
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user-filled"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    id="password-id"
                    required
                  />
                  <label htmlFor="password-id">Šifra</label>
                </div>
                <div className="forgot">
                  <a onClick={handlePasswordReset} href="#">
                    Zaboravljena šifra?
                  </a>
                </div>
                <button onClick={handleLoginUser} type="submit" className="btn">
                  Prijavi se
                </button>
                {error && <div className="error-message">{error}</div>}
                <div className="google-btn">
                  <button onClick={signInWithGoogle} className="btn">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-google"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
                      </svg>
                    </span>
                    Nastavi sa Google
                  </button>
                </div>
                <div className="register">
                  <p>Namaš nalog?</p>
                  <a
                    onClick={handleRegister}
                    href="#"
                    className="register-link"
                  >
                    Registruj se
                  </a>
                </div>
              </form>
            </div>

            <div className="form-box register-form">
              <h2>Registracija</h2>
              <form action="#">
                <div className="input-box">
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-mail-filled"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    id="email"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="input-box">
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user-filled"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                      <path
                        d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"
                        strokeWidth="0"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    id="password"
                    required
                  />
                  <label htmlFor="password">Šifra</label>
                </div>
                <div className="terms">
                  <label>
                    <input className=".check-box" type="checkbox" required />{" "}
                    Želiš da se prijaviš na naš Newsletter
                  </label>
                </div>
                <div className="google-btn">
                  <button onClick={signInWithGoogle} className="btn">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-google"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
                      </svg>
                    </span>
                    Nastavi sa Google
                  </button>
                </div>
                <button onClick={signIn} type="submit" className="btn">
                  Registruj se
                </button>
                {error && <div className="error-message">{error}</div>}
                <div className="register">
                  <p>Već imaš napravljen nalog?</p>
                  <a onClick={handleLogin} href="#" className="register-link">
                    Prijavi se
                  </a>
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Login;
