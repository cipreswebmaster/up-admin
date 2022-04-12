import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "services/settings";
import randomNumber from "helpers/generateRandomNumber";
import deletePost from "services/deletePost";

import styles from "./index.module.scss";
import deleteIcon from "./images/delete_icon.png";
import editIcon from "./images/edit_icon.png";

function PostWithOptions({ post, onPostDeleted }) {
  const { push } = useHistory();
  const { pathname } = useLocation();

  function formatDate(date) {
    return date.split("-").reverse().join("/");
  }

  function handleEditClick() {
    const title = post["title"].trim().replaceAll(" ", "-").toLowerCase();
    push({
      pathname: `${pathname}/edit/${title}`,
      state: {
        post,
      },
    });
  }

  function handleDeleteClick() {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: `Estás a punto de eliminar el post: ${post["title"]}`,
      showCancelButton: true,
      cancelButtonText: "No eliminar",
      cancelButtonColor: "green",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.showLoading();
        deletePost(post["id_post"]).then((res) => {
          if (res.success) {
            Swal.fire({
              icon: "success",
              title: "Post eliminado con éxito",
            });
            onPostDeleted();
          } else {
            Swal.fire({
              icon: "error",
              title: "Hubo un problema tratando de eliminar el post",
            });
          }
        });
      }
    });
  }

  return (
    <div className={styles.post}>
      <div className={styles.image}>
        <img
          src={`${API_URL}/images/posts/post/${post["image"]}?${randomNumber(
            10000,
            99999
          )}`}
          alt="Posts"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{post["title"]}</div>
        <div className={styles.entradilla}>{post["entradilla"]}</div>
        <div className={styles.dates}>
          <div className={styles.created}>
            Publicada: {formatDate(post["created_at"].split(" ")[0])}
          </div>
          <div className={styles.updated}>
            Última actualización: {formatDate(post["updated_at"].split(" ")[0])}
          </div>
        </div>
      </div>
      <div className={styles.action}>
        <img src={deleteIcon} alt="Delete icon" onClick={handleDeleteClick} />
        <img src={editIcon} alt="Edit icon" onClick={handleEditClick} />
      </div>
    </div>
  );
}
export default PostWithOptions;
