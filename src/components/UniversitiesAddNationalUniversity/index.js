import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { API_URL } from "services/settings";
import getFileContent from "helpers/getFileContent";

function UniversitiesAddNationalProfile() {
  const [archivo, setArchivo] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [u, setU] = useState();

  useEffect(function () {
    fetch(`${API_URL}/api/universidades`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => setUniversidades(res));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    getFileContent(archivo[0]).then((res) => {
      const fd = new FormData();
      fd.append("u", u);
      fd.append("universidades", JSON.stringify(res));

      fetch(`${API_URL}/api/add_profs_to_national`, {
        method: "POST",
        body: fd,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Select
          aria-label="Universidades"
          onChange={(e) => setU(e.target.value)}
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
      <Button type="submit" variant="success">
        Subir universidades
      </Button>
    </Form>
  );
}
export default UniversitiesAddNationalProfile;
