import "@styles/Blog.scss";
import { useEffect, useState } from "react";
import { useStore } from "../zustand/store";

// firebase
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config.js";

//components
import Login from "../components/Login";
import BlogCard from "../components/BlogCard.jsx";

const Blog = () => {
  const { login } = useStore();
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    const postCollectionRef = collection(db, "blogs");
    const getAllBlogs = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        setBlogList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error(err);
      }
    };
    getAllBlogs();
  }, []);

  return (
    <>
      {login && <Login />}
      <div className="blog-container">
        <div className="blog-wrapper">
          {blogList.map((post) => {
            return (
              <BlogCard key={post.id} post={post} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blog;
