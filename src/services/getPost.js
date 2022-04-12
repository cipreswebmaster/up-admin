import { API_URL } from "./settings";

function getPost(title) {
  const fd = new FormData();
  fd.append("title", title);

  return fetch(`${API_URL}/get_post.php`, {
    method: "POST",
    body: fd,
  })
    .then((res) => res.json())
    .catch((err) => ({
      success: false,
      message: err,
    }));
}
export default getPost;
