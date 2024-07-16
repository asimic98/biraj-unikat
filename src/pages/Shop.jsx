import "@styles/Shop.scss";
import { useStore } from "../zustand/store";
import { productsData } from "../database/productsData.js";
import { useState, useEffect } from "react";
import { handleScroll } from "../helpers/handleScroll";

//components
import Login from "@components/Login";
import Loader from "@components/Loader.jsx";
import ProductCard from "@components/ProductCard.jsx";

const Shop = () => {
  const { login } = useStore();

  // const filterProduct = ["svi", "pojedinacno", "set"];
  // const [showMenu, setShowMenu] = useState(false);
  const categoryProduct = ["slava", "svadba"];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectTerm, setSelectTerm] = useState("");
  const [isFilterPresent, setIsFilterPresent] = useState(false);

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

  useEffect(() => {
    // Retrieve the saved filter from local storage when the component mounts
    const savedFilter = localStorage.getItem("selectedFilter");
    if (savedFilter) {
      setSelectTerm(savedFilter);
      setIsFilterPresent(true);
    } else {
      setSelectTerm(""); // Show all products if no filter is saved
      setIsFilterPresent(false);
    }
  }, []);

  const handleRemoveFilter = () => {
    localStorage.removeItem("selectedFilter");
    setSelectTerm(""); // Clear the filter in the state
    setIsFilterPresent(false);
  };

  const handleFilterClick = (filter) => {
    // Save the selected filter to local storage
    setSelectTerm(filter);
    setIsFilterPresent(true);
    localStorage.setItem("selectedFilter", filter);
  };

  //Infinite scroll
  const isMobileDevice = () => {
    return window.innerWidth <= 768;
  };

  const [displayCount, setDisplayCount] = useState(isMobileDevice() ? 4 : 10);

  const handleScrollEvent = () =>
    handleScroll(".footer-wrapper", setDisplayCount);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);
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
                onClick={() => handleFilterClick(filter)}
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
          <div>
            {isFilterPresent && (
              <div>
                <button className="remove-filter" onClick={handleRemoveFilter}>
                  Ukloni Filter
                </button>
              </div>
            )}
          </div>
          {/* <div className="dropdown">
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
          </div> */}
        </div>
        {productsData ? (
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
              .slice(0, displayCount)
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
              <h2 className="no-result">
                Nema proizvoda koji odgovara ovim parametrima!!!
              </h2>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Shop;
