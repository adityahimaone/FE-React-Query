/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import { getProduct } from "../api/products";

// eslint-disable-next-line react/prop-types
function Product({ id, successAddProduct = false }) {
  const productsQuery = useQuery(["products", id], () => getProduct(id));
  if (productsQuery.isLoading) return <h1>loading...</h1>;
  if (productsQuery.isError)
    return <pre>{JSON.stringify(productsQuery.error)}</pre>;
  return (
    <div>
      {successAddProduct && (
        <span className="p-1 bg-green-500 rounded-sm">
          Product successfully added 🎉
        </span>
      )}
      <h1 className="text-2xl font-semibold">
        Product Name : {productsQuery.data.title}
      </h1>
      <p className="text-xl">Description: {productsQuery.data.description}</p>
    </div>
  );
}

export default Product;
