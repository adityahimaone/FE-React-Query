/* eslint-disable no-unused-vars */
import { useQuery, useMutation, useQueryClient } from "react-query";
import { POSTS } from "../data";
import { getProducts } from "../api/products";
// useQuery and useMutation are hooks that we can use to interact with the query client.

function ListProduct() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(500).then(() => POSTS.push({ id: POSTS.length + 1, title }));
    },
    onSuccess: () => {
      // invalidateQueries is a method that can be used to invalidate a query and refetch it.
      queryClient.invalidateQueries("products");
    },
  });

  /**
   * queryKey dan queryFn adalah properti yang digunakan oleh hook useQuery dari React Query untuk melakukan fetching data.
   *  queryKey adalah array yang berisi parameter yang digunakan untuk melakukan fetching data. Jika parameter berubah, maka React Query akan melakukan fetching data ulang.
   *  queryFn adalah fungsi yang digunakan untuk melakukan fetching data. Fungsi ini harus mengembalikan sebuah promise yang akan di-resolve dengan data yang di-fetch.
   *  staleTime adalah waktu dalam milidetik dimana data dianggap fresh. Jika data sudah lebih lama dari waktu yang ditentukan, maka React Query akan melakukan fetching data ulang.
   *  refetchInterval adalah waktu dalam milidetik dimana data akan di-fetch ulang secara otomatis. Jika data sudah lebih lama dari waktu yang ditentukan, maka React Query akan melakukan fetching data ulang.
   *  Dalam contoh kode yang  diberikan, queryKey digunakan untuk memberikan nama pada query yang dilakukan, yaitu "posts". Sedangkan queryFn digunakan untuk melakukan fetching data dari array POSTS dengan menunggu selama 1 detik menggunakan fungsi wait.
   */

  /**
   * mutationFn adalah fungsi yang digunakan untuk melakukan mutasi data. Fungsi ini harus mengembalikan sebuah promise yang akan di-resolve dengan hasil dari mutasi data.
   * onSuccess adalah callback function yang akan dipanggil ketika mutasi data berhasil dilakukan.
   * Method invalidateQueries digunakan untuk menghapus data cache dari query dengan nama "posts" dan melakukan fetch ulang data tersebut.
   */

  if (productsQuery.isLoading) return <h1>loading...</h1>;
  if (productsQuery.isError)
    return <pre>{JSON.stringify(productsQuery.error)}</pre>;
  return (
    <>
      <h1 className="text-3xl font-semibold">List Product</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {productsQuery?.data?.products?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {/* mutate is method for add new POSTS */}
        {/* <button
          type="button"
          disabled={newPostMutation.isLoading}
          onClick={() => newPostMutation.mutate("New Post")}
        >
          Add Post
        </button> */}
      </div>
    </>
  );
}

/**
 * Wait for a specified duration.
 * @param {number} duration - The duration to wait in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// Two Thing In React Query is query and mutation
// query is for fetching data (mendapatkan data)
// mutation is for updating data(mengubah data)

/**
  Fresh: A query is considered fresh when it has never been fetched before. This is the initial state of a query. 
  Fetching: A query is considered fetching when it is currently fetching data from the server. This state occurs when a query is first executed or when the query is refetched.
  Stale: A query is considered stale when it has been fetched before, but the data is no longer considered fresh. This can occur when the query is refetched after a certain amount of time has passed or when the query is invalidated due to external changes.
  Inactive: A query is considered inactive when it has been fetched before and the data is still considered fresh, but the query is not currently being used by any components. This can occur when a component that was using the query is unmounted
 */

/**
 * React useQuery can refetch data when:
 * 1. When the query is first executed.
 * 2. When the query is refetched manually.
 * 3. When the query is refetched after a certain amount of time has passed.
 * 4. When the query is invalidated due to external changes.
 * 5. When the query is refetched after a mutation.
 * 6. When the query is refetched after a window focus.
 * 7. When the query is refetched after a window blur.
 * 8. When the query is refetched after a window online.
 * 9. When the query is refetched after a window offline.
 * 10. When the query is refetched after a network change.
 * 11. When the query is refetched after a manual cache invalidation.
 * 12. When the query is refetched after a manual cache reset.
 * 13. When the query is refetched after a manual query invalidation.
 * 14. When the query is refetched after a manual query reset.
 * 15. When the query is refetched after a manual query retry.
 * 16. When the query is refetched after a manual query fetch.
 */

export default ListProduct;
