import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { API_URL } from "services/settings";
import Swal from "sweetalert2";
import getFileContent from "helpers/getFileContent";
import getPaises from "services/getPaises";

function ConvertBasicProfile() {
  const [archivo, setArchivo] = useState([]);
  const [pais, setPais] = useState("");
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    getPaises().then((res) => {
      setPaises(res);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    getFileContent(archivo[0]).then((res) => {
      const fd = new FormData();
      fd.append("pais", pais);
      fd.append("universidades", JSON.stringify(res));

      fetch(`${API_URL}/api/convert_basics_profile`, {
        method: "POST",
        body: fd,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            Swal.fire({
              title: "Proceso terminado con éxito",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: `Algo salió mal: ${res.error}`,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: `Algo salió mal: ${err}`,
            icon: "error",
          });
        });
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Selecciona el país de las universidades</Form.Label>
        <Form.Select
          aria-label="Paises"
          onChange={(e) => setPais(e.target.value)}
          required
        >
          <option>Selecciona un país...</option>
          {paises.map((val, i) => (
            <option value={val.id_pais} key={i}>
              {val.nombre_pais}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <br />
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
export default ConvertBasicProfile;
