import { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import getFromAPI from "services/getFromAPI";
import getPaises from "services/getPaises";
import getCarreras from "services/getCarreras";

import styles from "./index.module.scss";

function AddForeignUniversitie() {
  const [info, setInfo] = useState({
    profesiones: [],
  });
  const [paises, setPaises] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const previewCampusRef = useRef();
  const previewLogoRef = useRef();

  useEffect(() => {
    getCarreras().then((res) => {
      setCarreras(res);
    });
    getPaises().then((res) => {
      setPaises(res);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    getFromAPI("create_universidad", info).then((res) => {
      console.log(res);
    });
  }

  function handleCampusChange(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      let image = document.createElement("img");
      image.src = reader.result;
      previewCampusRef.current.innerHTML = "";
      previewCampusRef.current.append(image);
    };
    setInfo((state) => ({ ...state, campus: e.target.files[0] }));
  }

  function handleLogoChange(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      let image = document.createElement("img");
      image.src = reader.result;
      previewLogoRef.current.innerHTML = "";
      previewLogoRef.current.append(image);
    };
    setInfo((state) => ({ ...state, logo: e.target.files[0] }));
  }

  function handleCarreraClicked(e) {
    const id = e.target.dataset.id;
    const _ = info.profesiones.slice();

    if (e.target.checked) {
      _.push(id);
    } else {
      const idx = _.findIndex((val) => parseInt(val) === parseInt(id));
      _.splice(idx, 1);
    }

    setInfo((s) => ({ ...s, profesiones: _ }));
  }

  function handleBuscarCarreraChange(e) {
    const valorInput = e.target.value;
    const labels = document.querySelectorAll(`.${styles.car_label}`);
    labels.forEach((val) => {
      const text = val.textContent;
      if (text.indexOf(valorInput) > -1) {
        val.style.display = "block";
      } else {
        val.style.display = "none";
      }
    });
  }

  function updateState(fieldName, e) {
    setInfo((state) => ({ ...state, [fieldName]: e.target.value }));
  }

  return (
    <>
      <style>{css}</style>
      <h1>Formulario de registro de universidades extranjeras</h1>
      <br />
      <Form onSubmit={handleSubmit}>
        <div className={styles.fields_container}>
          {formFields.map((val, i) => (
            <Form.Group key={i}>
              <Form.Label>{val.label}</Form.Label>
              <Form.Control
                type={val.type}
                as={val.as}
                rows={val.rows}
                placeholder={val.placeholder}
                value={info[val.dataName]}
                onChange={(e) => updateState(val.dataName, e)}
                required={val.required}
              ></Form.Control>
              {val.required && (
                <Form.Text style={{ color: "red" }}>Obligatorio</Form.Text>
              )}
            </Form.Group>
          ))}
        </div>

        <div className="carreras_container">
          <h2>Selecciona las carreras que se mostrarán en esta universidad</h2>
          <Form.Control
            onInput={handleBuscarCarreraChange}
            placeholder="Ingresa el nombre de la carrera"
          />
          <br />
          <div className={styles.carreras}>
            {carreras.map((val, i) => (
              <label
                className={styles.car_label}
                id={`car-${i}`}
                name={`car-${i}`}
              >
                <input
                  type="checkbox"
                  onChange={handleCarreraClicked}
                  data-id={val.id_carrera}
                />
                {val.nombre_carrera}
              </label>
            ))}
          </div>
        </div>

        <div className="paises">
          <h4>Selecciona el país al que pertenece la univeridad</h4>
          <select
            name="pais"
            id="pais"
            onChange={(e) => updateState("id_pais", e)}
            required
          >
            <option>Selecciona un país</option>
            {paises.map((val, i) => (
              <option value={val.id_pais} key={i}>
                {val.nombre_pais}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.image}>
          <label>Imagen campus: </label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="campus"
            name="campus"
            onChange={handleCampusChange}
          ></input>
          <div
            id="preview"
            style={{ marginTop: "30px" }}
            ref={previewCampusRef}
          ></div>
        </div>
        <br />

        <div className={styles.image}>
          <label>Logo: </label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="logo"
            name="logo"
            onChange={handleLogoChange}
          ></input>
          <div
            id="preview"
            style={{ marginTop: "30px" }}
            ref={previewLogoRef}
          ></div>
        </div>
        <br />

        <Button type="submit" variant="success">
          Crear universidad
        </Button>
      </Form>
    </>
  );
}
export default AddForeignUniversitie;

const css = `
    .swal2-modal {
        width: 60vw !important;
    }
`;

const formFields = [
  {
    label: "Nombre universidad",
    type: "text",
    placeholder: "Nombre de la universidad",
    dataName: "nombre_universidad",
    required: true,
  },
  {
    label: "Video presentación",
    type: "text",
    placeholder: "Video presentación",
    dataName: "video_pres",
    required: true,
  },
  {
    label: "Descripción",
    placeholder: "Descripción de la universidad",
    as: "textarea",
    rows: 7,
    dataName: "descripcion_uni",
    required: true,
  },
  {
    label: "Proceso de admisión",
    placeholder: "Proceso de admisión",
    as: "textarea",
    rows: 7,
    dataName: "proceso_admision",
    required: true,
  },
  {
    label: "Link admisión",
    type: "text",
    placeholder: "Link de redirección del proceso de admisión",
    dataName: "link_admision",
  },
  {
    label: "Contacto de admisión",
    placeholder: "Contacto de admisión",
    as: "textarea",
    rows: 7,
    dataName: "contacto_admision",
    required: true,
  },
  {
    label: "Apoyo financiero",
    placeholder: "Apoyo financiero",
    as: "textarea",
    rows: 7,
    dataName: "apoyo_financiero",
    required: true,
  },
  {
    label: "Link de apoyo financiero",
    type: "text",
    placeholder: "Link de redirección hacía la parte de apoyo financiero",
    dataName: "link_apoyo",
  },
  {
    label: "Página web",
    type: "text",
    placeholder: "Página web",
    dataName: "web",
  },
  {
    label: "Becas",
    placeholder: "Becas",
    as: "textarea",
    rows: 7,
    dataName: "becas",
  },
  {
    label: "Link becas",
    type: "text",
    placeholder: "Link becas",
    dataName: "link_becas",
  },
  {
    label: "Cursos online",
    placeholder: "Cursos online",
    as: "textarea",
    rows: 7,
    dataName: "cursos_online",
  },
  {
    label: "Precio matrícula",
    type: "number",
    placeholder: "Precio matrícula",
    dataName: "matricula_cuotas",
  },
  {
    label: "Vida en el campus",
    placeholder: "Vida en el campus",
    as: "textarea",
    rows: 7,
    dataName: "vida_campus",
  },
  {
    label: "Lista de reproducción de testimonios",
    type: "text",
    placeholder: "Lista de reproducción de testimonios",
    dataName: "testimonios",
  },
];
