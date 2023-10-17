import { useState } from "react";
import { getProductPagination } from "../api/products";
import { useQuery } from "react-query";

function ListProductPagination() {
  const [pagination, setPagination] = useState({ limit: 10, skip: 0 });

  const { data, isLoading, isError, error } = useQuery(
    ["products", { pagination }],
    () => getProductPagination(pagination),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <h1>loading...</h1>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;
  return (
    <>
      <h1 className="text-3xl font-semibold">React Query</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="btn-pagination"
          onClick={() =>
            setPagination((prev) => ({ ...prev, skip: prev.skip - prev.limit }))
          }
          disabled={pagination.skip === 0}
        >
          Previous
        </button>
        <button
          className="btn-pagination"
          onClick={() =>
            setPagination((prev) => ({ ...prev, skip: prev.skip + prev.limit }))
          }
          disabled={data?.nextPage === null}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ListProductPagination;
