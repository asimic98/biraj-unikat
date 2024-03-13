import "@styles/BlogPost.scss";
import { useStore } from "../zustand/store";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";

// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

//components
import Login from "@components/Login";
import Loader from "@components/Loader.jsx";

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
      {blog ? (
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default BlogPost;
