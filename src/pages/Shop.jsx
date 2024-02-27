import "@styles/Shop.scss";
import { useStore } from "../zustand/store";
import { productsData } from "../database/productsData.js";
import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

//components
import Login from "../components/Login";

const Shop = () => {
  const { login } = useStore();

  const filterProduct = ["svi", "pojedinacno", "set"];
  const [showMenu, setShowMenu] = useState(false);
  const categoryProduct = ["slava", "svadba"];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectTerm, setSelectTerm] = useState("");

  //regex za dijakritike tj znakove koji se dodaju slovima
  function searchingFor(term) {
    const regex = new RegExp(
      term.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      "i"
    );
    return function (x) {
      return (
        regex.test(x.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
        regex.test(
          x.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        )
      );
    };
  }

  const filterForProduct = (item) => {
    if (selectTerm === "") {
      return item;
    }
    if (selectTerm === "svi") {
      return item;
    }
    if (item.category.toLowerCase().includes(selectTerm.toLowerCase())) {
      return item;
    }
    if (item.subcategory.toLowerCase().includes(selectTerm.toLowerCase())) {
      return item;
    }
  };
  return (
    <>
      {login && <Login />}
      <div className="product-wrapper">
        <div className="category-product">
          <h3>Izaberi kategoriju proizvoda:</h3>
          <ul>
            {categoryProduct.map((filter, i) => (
              <li
                className={filter === "slava" ? "saint" : "wedding"}
                onClick={() => setSelectTerm(filter)}
                key={i}
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>
        <div className="header">
          <div className="search-filter">
            <button type="button" disabled></button>
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Pretraga..."
            />
          </div>

          <div className="dropdown">
            <button onClick={() => setShowMenu(!showMenu)} className="dropbtn">
              {selectTerm ? selectTerm : `Filteri`}
              <img
                src="https://www.iconbolt.com/iconsets/boxicons-regular/chevron-down.svg"
                alt="arrow down"
              />
            </button>
            {showMenu && (
              <div className="dropdown-content">
                <ul>
                  {filterProduct.map((filter, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setSelectTerm(filter);
                        setShowMenu(false);
                      }}
                    >
                      {filter}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="product-container">
          {productsData
            .filter((item) => {
              if (searchTerm === "") {
                return true;
              } else if (searchingFor(searchTerm)(item)) {
                return true;
              }
            })
            .filter(filterForProduct)
            .map((item) => {
              return <ProductCard key={item.id} product={item} />;
            })}

          {productsData
            .filter((item) => {
              if (searchTerm === "") {
                return true;
              } else if (searchingFor(searchTerm)(item)) {
                return true;
              }
            })
            .filter(filterForProduct).length === 0 && (
            <h2 className="no-result">Nema proizvoda koji odgovaraju ovim parametrima!!!</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
