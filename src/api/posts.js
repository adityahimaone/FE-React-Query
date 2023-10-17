// data from https://jsonplaceholder.typicode.com/posts
// Routes:
// GET	/posts
// GET	/posts/1
// GET	/posts/1/comments
// GET	/comments?postId=1
// POST	/posts
// PUT	/posts/1
// PATCH	/posts/1
// DELETE	/posts/1
import axios from "axios";

var urlData = "https://jsonplaceholder.typicode.com/";

export function getPosts() {
  return axios.get(urlData + "posts").then((response) => response.data);
}

export function getPost(id) {
  return axios.get(urlData + "posts/" + id).then((response) => response.data);
}

export function createPosts({ title, body }) {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json);
}
