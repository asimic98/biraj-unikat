import "@styles/components-styles/BlogCard.scss";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const BlogCard = ({ post }) => {
  let text = post.text;
  let slicedText = text.split(" ").slice(0, 30).join(" ");

  return (
    <>
      <div className="blog-card-wrapper">
        <Link to={`/blog/${post.id}`} className="blog-card-container">
          <div className="banner-container">
            <img loading="lazy" src={post.image} alt="blog banner" />
          </div>
          <div className="blog-card-info">
            <h2>{post.title}</h2>
            <div className="blog-text">{parse(`${slicedText}...`)}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BlogCard;
