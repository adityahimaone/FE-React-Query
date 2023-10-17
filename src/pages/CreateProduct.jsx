/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
// import { POSTS } from "../data";
// import DefaultPage from "./ListPost";
import Product from "./Product";
import { createProduct } from "../api/products";

// eslint-disable-next-line react/prop-types
function CreateProduct({ setCurrentPage }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.setQueryData(["products", data.data.id], data.data);
      queryClient.invalidateQueries(["products", { exact: true }]);
      setCurrentPage(<Product id={data.data.id} successAddProduct={true} />);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createProductMutation.mutate({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input className="form-input" name="title" ref={titleRef} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-input"
            name="description"
            ref={descriptionRef}
          />
        </div>
        <button type="submit" className="mt-2 btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
