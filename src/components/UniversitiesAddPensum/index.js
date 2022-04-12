import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { API_URL } from "services/settings";
import Swal from "sweetalert2";
import getFromAPI from "services/getFromAPI";
import addFileListToFD from "helpers/addFileListToFD";

function UniversitiesAddPensum() {
  const [universidad, setUniversidad] = useState([]);
  const [pensums, setPensums] = useState([]);
  const [universidades, setUniversidades] = useState([]);

  useEffect(() => {
    getFromAPI("universidades").then((res) => setUniversidades(res));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("universidad", universidad);
    addFileListToFD(fd, pensums, "pensums");

    Swal.showLoading();
    fetch(`${API_URL}/api/subir_pensums`, {
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
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Selecciona el país de las universidades</Form.Label>
        <Form.Select
          aria-label="Paises"
          onChange={(e) => setUniversidad(e.target.value)}
          required
        >
          <option>Selecciona una universidad...</option>
          {universidades.map((val, i) => (
            <option value={val.id_universidad} key={i}>
              {val.nombre_universidad}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <br />
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Pensums</Form.Label>
        <Form.Control
          type="file"
          id="pensums"
          name="pensums"
          accept="image/*"
          multiple
          onChange={(e) => setPensums(e.target.files)}
        />
      </Form.Group>

      <br />
      <Button type="submit">Enviar</Button>
    </Form>
  );
}
export default UniversitiesAddPensum;
