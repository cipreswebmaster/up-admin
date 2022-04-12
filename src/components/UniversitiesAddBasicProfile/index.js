import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { API_URL } from "services/settings";
import getPaises from "services/getPaises";
import getFileContent from "helpers/getFileContent";
import addFileListToFD from "helpers/addFileListToFD";

const mySwal = withReactContent(Swal);
function UniversitiesAddBasicProfile() {
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState(0);
  const [logos, setLogos] = useState([]);
  const [campus, setCampus] = useState([]);
  const [archivo, setArchivo] = useState([]);

  useEffect(() => {
    getPaises().then((res) => {
      setPaises(res);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (logos.length !== campus.length) {
      Swal.fire({
        title: "Algo no cuadra...",
        icon: "error",
        text: "La cantidad de logos no es la misma que la de campus.",
      }).then(() => {
        mySwal.fire({
          title: "Formulario universidades básicas",
          html: <UniversitiesAddBasicProfile></UniversitiesAddBasicProfile>,
          showConfirmButton: false,
        });
      });
      return;
    }

    getFileContent(archivo[0]).then((res) => {
      const fd = new FormData();
      fd.append("id_pais", pais);
      fd.append("universidades", JSON.stringify(res));
      addFileListToFD(fd, logos, "logos");
      addFileListToFD(fd, campus, "campus");

      fetch(`${API_URL}/api/add_basic_u`, {
        method: "POST",
        body: fd,
      }).then((res) => {
        if (res.success) {
          Swal.fire({
            title: "Subida terminada",
            text: "Se han subido las universidades correctamente",
          });
        }
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
        <Form.Label>Archivo</Form.Label>
        <Form.Control
          type="file"
          id="archivo"
          name="archivo"
          onChange={(e) => setArchivo(e.target.files)}
        ></Form.Control>
      </Form.Group>

      <br />
      <Form.Text>
        Para que las universidades se suban correctamente, tanto los logos como
        las fotos del campus deben tener el mismo nombre
      </Form.Text>
      <br />
      <br />

      <Form.Group>
        <Form.Label>Logos</Form.Label>
        <Form.Control
          type="file"
          id="logos"
          name="logos"
          multiple
          accept="image/*"
          onChange={(e) => setLogos(e.target.files)}
        ></Form.Control>
      </Form.Group>

      <br />
      <Form.Group>
        <Form.Label>Fotos de campus</Form.Label>
        <Form.Control
          type="file"
          id="campus"
          name="campus"
          multiple
          accept="image/*"
          onChange={(e) => setCampus(e.target.files)}
        ></Form.Control>
      </Form.Group>

      <br />
      <Button type="submit" variant="success">
        Subir universidades
      </Button>
    </Form>
  );
}
export default UniversitiesAddBasicProfile;
