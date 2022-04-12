import { useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import getFileContent from "helpers/getFileContent";

import styles from "./index.module.scss";

const mySwal = withReactContent(Swal);
function Users() {
  const fileRef = useRef();

  function handleAddColege() {
    mySwal.fire({
      html: (
        <>
          <form onSubmit={handleSubmitForm}>
            <input type="file" name="file" ref={fileRef} />
            <button type="submit">Enviar</button>
          </form>
        </>
      ),
      showConfirmButton: false,
    });
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    const file = fileRef.current.files[0];
    getFileContent(file).then((c) => {
      mySwal.showLoading();
      fetch("http://universidadesyprofesiones.com/api/add_school", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: c }),
      })
        .then((res) => res.json())
        .then((res) => {
          mySwal.fire({
            title: "Usuarios procesados",
            html: (
              <>
                <ul styles={{ listStyle: "none" }}>
                  <li>Usuarios registrados: {res.success}</li>
                  <li>Usuarios fallidos: {res.failed}</li>
                  {res.failed !== 0 && (
                    <li>Usuarios existentes: {res.existingEmails}</li>
                  )}
                </ul>
              </>
            ),
          });
        });
    });
  }

  return (
    <div className={styles.users}>
      <button onClick={handleAddColege}>Agregar colegio </button>
    </div>
  );
}
export default Users;
