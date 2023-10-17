import axios from "axios";

var urlData = "https://dummyjson.com/";

export function getProducts() {
  return axios.get(urlData + "products").then((response) => response.data);
}

export function getProduct(id) {
  return axios.get(urlData + "product/" + id).then((response) => response.data);
}

export async function getProductPagination({ limit, skip }) {
  try {
    const response = await axios.get(
      urlData + `products?limit=${limit}&skip=${skip}`
    );
    const hasNext = response.data.total > skip + limit;
    return {
      nextPage: hasNext ? skip + limit : null,
      prevPage: skip > 0 ? skip - limit : null,
      products: response.data.products,
      total: response.data.total,
    };
  } catch (error) {
    console.error(error);
  }
}

export function createProduct({ title, description }) {
  return axios.post(
    urlData + "products/add",
    JSON.stringify({
      title,
      description,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
