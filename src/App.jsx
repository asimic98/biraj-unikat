//pages
import Home from "@pages/Home";
import Shop from "@pages/Shop";
import Product from "@pages/Product";
import Cart from "@pages/Cart";
import Blog from "@pages/Blog";
import CreateBlog from "@pages/CreateBlog";
import Error from "@pages/Error";
import BlogPost from "@pages/BlogPost";

//components
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import ScrollToTop from "@components/ScrollToTop";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main className="app">
        <Router>
          <ScrollToTop />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/createblog" element={<CreateBlog />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      </main>
    </>
  );
}

export default App;
