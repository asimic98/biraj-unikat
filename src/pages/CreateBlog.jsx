import "@styles/CreateBlog.scss";
import { useStore } from "../zustand/store";
import { useState, useRef } from "react";

// firebase
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/config.js";
import { storage } from "../firebase/config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

//components
import Login from "../components/Login";

const CreateBlog = () => {
  const { login } = useStore();
  const [postTitle, setPostTitle] = useState("");
  const [postImage, setPostImage] = useState(null);
  //html parse
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const postCollectionRef = collection(db, "blogs");
  let navigate = useNavigate();

  const uploadImage = async () => {
    if (postImage == null) return;
    const imageRef = ref(storage, `images/${postImage.name}`);
    const snapshot = await uploadBytes(imageRef, postImage);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const createPost = async () => {
    try {
      const imageUrl = await uploadImage();
      // uploadImage();
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
      console.log(err);
    }
  };
  return (
    <>
      {login && <Login />}
      <div className="create-blog-wrapper">
        <div className="create-blog">
          <div className="create">
            <h1>Kreiraj Blog!</h1>
            <div className="input">
              <label htmlFor="file">Slika:</label>
              <input
                onChange={(e) => {
                  setPostImage(e.target.files[0]);
                }}
                type="file"
                id="file"
                required
              />
            </div>
            <div className="input input-jodit">
              <label htmlFor="text">Naslov:</label>
              <input
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
                type="text"
                id="text"
                required
                placeholder="Naslov bloga..."
              />
            </div>
            <div className="input">
              <label htmlFor="textarea">Tekst:</label>
              <JoditEditor
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                ref={editor}
                value={content}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
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
