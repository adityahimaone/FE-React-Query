import { useInfiniteQuery } from "react-query";
import { getProductPagination } from "../api/products";
import { useEffect, useRef } from "react";
import CardSkeleton from "../components/CardSkeleton";

function ListProductInfiniteObserver() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", "infinite-observer"],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: ({ pageParam = 0 }) =>
      getProductPagination({ limit: 10, skip: pageParam }),
  });

  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        });
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const currentRef = observerRef.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  var skeleton = Array.from({ length: 10 }, (_, i) => <CardSkeleton key={i} />);

  if (isLoading)
    return <div className="grid grid-cols-5 gap-4">{skeleton}</div>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;

  return (
    <>
      <h1 className="mb-3 text-3xl font-semibold">
        List Product Infinite With Observer
      </h1>
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
      <div ref={observerRef} />

      {hasNextPage && (
        <>
          {isFetchingNextPage && (
            <div className="grid grid-cols-5 gap-4">{skeleton}</div>
          )}
          <div className="flex justify-center mt-3">
            <button
              className="my-5 text-indigo-700"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <>
                  <svg
                    className="w-10 h-10 ml-2 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4a7.946 7.946 0 01-2 1.291z"
                    ></path>
                  </svg>
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ListProductInfiniteObserver;
