import { API_URL } from "./settings";
import getFormDataFromObj from "helpers/getFormDataFromObj";

async function deletePost(id) {
  const fd = getFormDataFromObj({
    id,
  });

  return fetch(`${API_URL}/api/delete_post`, {
    method: "POST",
    body: fd,
  })
    .then((res) => res.json())
    .catch((err) => ({
      success: false,
      message: err,
    }));
}
export default deletePost;
