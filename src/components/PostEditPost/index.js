import { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import PostForm from "../PostForm";
import getPost from "services/getPost";

function EditPost() {
  const [post, setPost] = useState();
  const { state } = useLocation();
  const { title } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    if (!state || !state.post) {
      getPost(title).then((res) => {
        if (res.success) {
          setPost(res.post);
          return;
        }

        Swal.fire({
          icon: "error",
          text: `No se pudo cargar el post a editar: ${res.message}`,
        }).then(() => {
          push("/posts");
        });
      });
      return;
    }
    setPost(state.post);

    // eslint-disable-next-line
  }, []);

  return <PostForm update postInfo={post} />;
}
export default EditPost;
