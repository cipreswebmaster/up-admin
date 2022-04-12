import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { API_URL } from "services/settings";
import generateRandomNumber from "helpers/generateRandomNumber";

import styles from "./index.module.scss";

function PostForm({ update, postInfo = {} }) {
  const [title, setTitle] = useState("");
  const [entradilla, setEntradilla] = useState("");
  const [image, setImage] = useState(undefined);
  const [post, setPost] = useState("");
  const [tags, setTags] = useState("");
  const [seccion, setSeccion] = useState("Actualidad universitaria");
  const { push } = useHistory();
  const editor = useRef(null);
  const imgPreview = useRef(null);

  useEffect(() => {
    const itsEmpty = !Object.keys(postInfo).length;
    if (!itsEmpty) {
      setTitle(postInfo["title"]);
      setEntradilla(postInfo["entradilla"]);
      setImage(postInfo["image"]);
      setPost(postInfo["post"]);
      setTags(postInfo["tags"]);
    }
  }, [postInfo]);

  useEffect(() => {
    if (typeof image === "object") {
      imgPreview.current.src = URL.createObjectURL(image);
    } else if (typeof image === "string") {
      imgPreview.current.src = `${API_URL}/images/posts/post/${
        postInfo["image"]
      }?${generateRandomNumber(10000, 99999)}`;
    }
  }, [image, postInfo]);

  function sendPost() {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("entradilla", entradilla);
    fd.append("image", image);
    fd.append("post", post);
    fd.append("tags", tags);
    fd.append("seccion", seccion);

    let file = "add_post";
    if (update) {
      file = "update_post";
      fd.append("post_id", postInfo["id_post"]);
    }

    const successMessage = update
      ? "Publicación actualizada con éxito"
      : "Publicación creada con éxito";

    Swal.showLoading();
    fetch(`${API_URL}/api/${file}`, {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((res) => {
        Swal.fire({
          icon: res.success ? "success" : "error",
          text: res.success ? successMessage : res.message,
        }).then(() => {
          push("/posts");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: `Ha ocurrido un error inesperado del lado del servidor: ${err}`,
        });
      });
  }

  return (
    <div className={styles.post_form}>
      <InputWithLabel
        title="Título"
        onChange={(d) => setTitle(d)}
        value={title}
      />
      <InputWithLabel
        title="Entradilla"
        onChange={(d) => setEntradilla(d)}
        value={entradilla}
      />
      <InputWithLabel
        title="Imagen"
        inputElement={
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        }
      />
      {image && <img src="" alt="Preview" ref={imgPreview} />}
      <InputWithLabel
        title="Post"
        inputElement={
          <JoditEditor
            ref={editor}
            value={post}
            config={{
              readonly: false, // all options from https://xdsoft.net/jodit/doc/
            }}
            onBlur={(nc) => setPost(nc)}
          />
        }
      />
      <label>Seleccione una sección para la noticias</label>
      <br />
      <select
        required
        onChange={(d) => setSeccion(d.target.value)}
        style={{
          marginBottom: "25px",
        }}
      >
        <option value="Actualidad universitaria">
          Actualidad universitaria
        </option>
        <option value="Noticias interes">Noticias interes</option>
      </select>
      <InputWithLabel title="Tags" onChange={(d) => setTags(d)} value={tags} />
      <button onClick={sendPost}>
        {update ? "Actualizar publicación" : "Crear publicación"}
      </button>
    </div>
  );
}
export default PostForm;

function InputWithLabel({ title, inputElement, onChange, value }) {
  return (
    <div className={styles.input_label}>
      <label className={styles.label}>{title}</label>
      {inputElement || (
        <input
          type="text"
          autoComplete="off"
          onInput={(e) => onChange(e.target.value)}
          className={styles.input}
          value={value}
        />
      )}
    </div>
  );
}
