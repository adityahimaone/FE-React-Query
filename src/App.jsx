import "./App.css";
import { useState } from "react";
import ListProduct from "./pages/ListProduct";
import CreateProduct from "./pages/CreateProduct";
import Product from "./pages/Product";
import ListProductPagination from "./pages/ListProductPagination";

function App() {
  const [currentPage, setCurrentPage] = useState(<ListProduct />);
  return (
    <div className="m-5">
      <div className="space-x-2 mb-3">
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
      </div>
      {currentPage}
    </div>
  );
}

export default App;
