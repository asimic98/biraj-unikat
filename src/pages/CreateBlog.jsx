import "@styles/CreateBlog.scss";
import { useStore } from "../zustand/store";
import { useState, useRef, useEffect } from "react";

// firebase
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/config.js";
import { storage } from "../firebase/config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

//components
import Login from "@components/Login";

const CreateBlog = () => {
  const { login } = useStore();
  const [postTitle, setPostTitle] = useState("");
  const [postImage, setPostImage] = useState(null);
  //html parse
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const postCollectionRef = collection(db, "blogs");
  let navigate = useNavigate();

  //prevent show /createblog if not admin
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        navigate("/blog");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const uploadImage = async () => {
    if (!postImage) {
      throw new Error("No image file selected");
    }
    const imageRef = ref(storage, `images/${postImage.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, postImage);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  if (currentUserEmail !== "simiccode@gmail.com") {
    return null;
  }

  const createPost = async () => {
    try {
      const imageUrl = await uploadImage();
      await addDoc(postCollectionRef, {
        title: postTitle,
        text: content,
        image: imageUrl,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      navigate("/blog");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <>
      {login && <Login />}
      <div className="create-blog-wrapper">
        <div className="create-blog">
          <div name="create-blog-form" id="create-blog-form" className="create">
            <h1>Kreiraj Blog!</h1>
            <div className="input">
              <label htmlFor="fileImage">Slika:</label>
              <input
                onChange={(e) => {
                  setPostImage(e.target.files[0]);
                }}
                type="file"
                id="fileImage"
                name="fileImage"
                required
              />
            </div>

            <div className="input input-jodit">
              <label htmlFor="postTitle">Naslov:</label>
              <input
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
                type="text"
                id="postTitle"
                name="postTitle"
                required
                placeholder="Naslov bloga..."
              />
            </div>
            <div className="input">
              <label htmlFor="textArea">Tekst:</label>
              <JoditEditor
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                ref={editor}
                value={content}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
                name="textArea"
                id="textArea"
              />
            </div>
            <button onClick={createPost}>Kreiraj</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
