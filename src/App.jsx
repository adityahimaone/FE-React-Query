import "./App.css";
import { useState } from "react";
import ListProduct from "./pages/ListProduct";
import CreateProduct from "./pages/CreateProduct";
import Product from "./pages/Product";
import ListProductPagination from "./pages/ListProductPagination";
import ListProductInfinite from "./pages/ListProductInfinite";
import ListProductInfiniteObserver from "./pages/ListProductInfiniteObserver";

function App() {
  const [currentPage, setCurrentPage] = useState(<ListProduct />);
  return (
    <div className="m-5">
      <div className="mb-3 space-x-2">
        <button
          className="btn-primary"
          type="button"
          onClick={() => setCurrentPage(<ListProduct />)}
        >
          List Product
        </button>
        <button
          className="btn-primary"
          type="button"
          onClick={() =>
            setCurrentPage(<CreateProduct setCurrentPage={setCurrentPage} />)
          }
        >
          Create Product
        </button>
        <button
          className="btn-primary"
          type="button"
          onClick={() => setCurrentPage(<Product id={1} />)}
        >
          First Product
        </button>
        <button
          className="btn-primary"
          type="button"
          onClick={() => setCurrentPage(<ListProductPagination />)}
        >
          Pagination Product
        </button>
        <button
          className="btn-primary"
          type="button"
          onClick={() => setCurrentPage(<ListProductInfinite />)}
        >
          Infinite Product
        </button>
        <button
          className="btn-primary"
          type="button"
          onClick={() => setCurrentPage(<ListProductInfiniteObserver />)}
        >
          Infinite Product With Observer
        </button>
      </div>
      {currentPage}
    </div>
  );
}

export default App;
