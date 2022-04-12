import { useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReadExcel from "read-excel-file";

import styles from "./index.module.scss";

const mySwal = withReactContent(Swal);
function ProfessionsIndex() {
  const fileRef = useRef();

  function handleAddFile() {
    mySwal.fire({
      html: (
        <>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            method="POST"
          >
            <input type="file" name="file" id="file" ref={fileRef} />
            <br />
            <button type="submit">Enviar</button>
          </form>
        </>
      ),
      showConfirmButton: false,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const excel = fileRef.current.files[0];
    ReadExcel(excel).then((res) => {
      const headers = res.shift();
      let success = 0;
      res.forEach((el) => {
        let obj = {};
        el.forEach((info, i) => {
          obj[headers[i]] = info;
        });

        fetch("https://universidadesyprofesiones.com/api/prof_masivo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) success++;
          });
      });

      Swal.fire({
        title: "Subida completa",
        text: `Subidas: ${success}/${res.length}`,
      });
    });
  }

  return (
    <div className={styles.professions}>
      <button onClick={handleAddFile}>Agregar archivo</button>
    </div>
  );
}
export default ProfessionsIndex;
