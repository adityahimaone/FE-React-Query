import { useInfiniteQuery } from "react-query";
import { getProductPagination } from "../api/products";
import CardSkeleton from "../components/CardSkeleton";

function ListProductInfinite() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: ({ pageParam = 0 }) =>
      getProductPagination({ limit: 10, skip: pageParam }),
  });

  var skeleton = Array.from({ length: 10 }, (_, i) => <CardSkeleton key={i} />);

  if (isLoading)
    return <div className="grid grid-cols-5 gap-4">{skeleton}</div>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;

  return (
    <>
      <h1 className="mb-3 text-3xl font-semibold">List Product Infinite</h1>
      {data.pages.map((group, i) => (
        <div key={i} className="mb-4">
          <div className="grid grid-cols-5 gap-4">
            {group?.products?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col p-4 rounded-md bg-slate-400/30"
              >
                <span className="text-xl font-semibold">{item.title}</span>
                <span className="text-lg">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="grid grid-cols-5 gap-4">{skeleton}</div>
      )}
      <div className="flex justify-center mt-3">
        <button
          className="btn-pagination"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      </div>
    </>
  );
}

export default ListProductInfinite;
