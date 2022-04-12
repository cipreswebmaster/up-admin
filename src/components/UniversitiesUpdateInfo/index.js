import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API_URL } from "services/settings";
import ReadExcel from "read-excel-file";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { isYTLink, getYTCode } from "helpers/ManageYTLinks";

import Fields from "./fields.json";
import getFormDataFromObj from "helpers/getFormDataFromObj";

const mySwal = withReactContent(Swal);
function UniversitiesUpdateInfo() {
  const [archivo, setArchivo] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    ReadExcel(archivo[0]).then((res) => {
      // Obteniendo informacion de la universidad
      let universidad = {};
      const universidadHeaders = res[0];
      universidadHeaders.forEach((h, i) => {
        const val = res[1][i];
        if (val) universidad[Fields[h]] = isYTLink(val) ? getYTCode(val) : val;
      });

      // Obteniendo la información de las carreras
      let carreras = [];
      const carrerasHeaders = res[2];
      for (let i = 3; i < res.length; i++) {
        let c = {};
        for (let j = 0; j < 6; j++) {
          const h = carrerasHeaders[j];
          if (!h) continue;
          const val = res[i][j];
          if (val) c[Fields[h]] = isYTLink(val) ? getYTCode(val) : val;
        }
        carreras.push(c);
      }

      // ENviando información a la API
      const fd = getFormDataFromObj({
        universidad: JSON.stringify(universidad),
        carreras: JSON.stringify(carreras),
      });

      mySwal.showLoading();
      fetch(`${API_URL}/api/actualizar_universidad`, {
        method: "POST",
        body: fd,
      })
        .then((res) => res.json())
        .then((res) => {
          const html = (
            <>
              <div>
                Universidad actualizada:{" "}
                {res.universidad_actualizada
                  ? "Sí"
                  : `No, ${
                      res.hasOwnProperty("universidad_error")
                        ? res.universidad_error
                        : "La información que se quería actualizar es igual a la actual"
                    }`}
              </div>
              <div>
                Carreras actualizadas: {res.carreras.actualizadas}/
                {carreras.length}
                {res.carreras.errores.length > 0 ?? (
                  <ul>
                    {res.carreras.errores.map((val) => (
                      <li>
                        Carrera con id {val.id_carrera}: {val.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          );

          mySwal.fire({
            icon: "success",
            title: "Proceso finalizado",
            html,
          });
        })
        .catch((err) => {
          mySwal.fire({
            icon: "error",
            title: err,
          });
        });
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Añadir archivo</Form.Label>
        <Form.Control
          type="file"
          id="archivo"
          name="archivo"
          onChange={(e) => setArchivo(e.target.files)}
        ></Form.Control>
      </Form.Group>

      <br />
      <Button type="submit">Enviar</Button>
    </Form>
  );
}
export default UniversitiesUpdateInfo;
