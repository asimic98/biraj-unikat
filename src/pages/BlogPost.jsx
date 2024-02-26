import "@styles/BlogPost.scss";
import { useStore } from "../zustand/store";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";

// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

//components
import Login from "../components/Login";

// faq importi
// import { faqData } from "../database/faqData.js";
// import Faq from "../components/Faq.jsx";

const BlogPost = () => {
  const { login } = useStore();
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog({ ...docSnap.data(), id: docSnap.id });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getBlog();
  }, [id]);

  return (
    <>
      {login && <Login />}
      <div className="blog-wrapper">
        {blog && (
          <div className="single-blog-container" key={blog.id}>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="back-button"
            >
              Nazad
            </button>
            <h2>{blog.title}</h2>
            <div className="img-container">
              <img src={blog.image} alt="" />
            </div>
            <div className="blog-text">{parse(`${blog.text}`)}</div>
          </div>
        )}
      </div>
      {/* faq uvoz na stranicu */}
      {/* <div className="page">
        <img className="background-pic" src={"#"} />
        <div className="container">
          <div className="header">
            <img src={"#"} />
            <h1>FAQ&apos;s</h1>
          </div>

          {faqData.map((qaa) => (
            <Faq
              questionText={qaa.questionText}
              answerText={qaa.answerText}
              key={qaa.id}
            />
          ))}
        </div>
      </div> */}
    </>
  );
};

export default BlogPost;
