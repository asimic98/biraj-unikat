//pages
import Home from "@pages/Home";
import Shop from "@pages/Shop";
import Product from "@pages/Product";
import Cart from "@pages/Cart";
import Blog from "@pages/Blog";
import CreateBlog from "@pages/CreateBlog";
import Error from "@pages/Error";

//components
import NavBar from "@components/NavBar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main className="app">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/createblog" element={<CreateBlog />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
