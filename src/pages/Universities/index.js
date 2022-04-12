import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useUniversities from "hooks/useUniversities";
import Button from "react-bootstrap/button";
import UniversitiesWithOptions from "components/UniversitiesWithOptions";
import AddForeignUniversitie from "components/UniversitiesAddForeign";
import UniversitiesAddBasicProfile from "components/UniversitiesAddBasicProfile";
import UniversitiesAddNationalProfile from "components/UniversitiesAddNationalUniversity";
import UniversitiesConvertBasicProfile from "components/UniversitiesConvertBasicsProfile";
import UniversitiesAddPensum from "components/UniversitiesAddPensum";
import UniversitiesUpdateInfo from "components/UniversitiesUpdateInfo/index";

import styles from "./index.module.scss";

const mySwal = withReactContent(Swal);
function Universities() {
  const { universities } = useUniversities();

  function handleAddNationalUniversities() {
    mySwal.fire({
      title: "Formulario universidades nacionales",
      html: <UniversitiesAddNationalProfile></UniversitiesAddNationalProfile>,
      showConfirmButton: false,
    });
  }

  function handleConvertBasicProfile() {
    mySwal.fire({
      title: "Convertir perfil básico a perfil completo",
      showConfirmButton: false,
      html: <UniversitiesConvertBasicProfile></UniversitiesConvertBasicProfile>,
    });
  }

  function openPopup(title, Component) {
    mySwal.fire({
      title,
      html: <Component></Component>,
      showConfirmButton: false,
    });
  }

  return (
    <>
      <div className={styles.buttons}>
        <Button
          variant="success"
          onClick={() => openPopup("", AddForeignUniversitie)}
        >
          Agregar universidad extranjera
        </Button>
        <Button
          variant="warning"
          onClick={() =>
            openPopup(
              "Formulario universidades básicas",
              UniversitiesAddBasicProfile
            )
          }
        >
          Agregar universidades básicas por lote
        </Button>
        <Button variant="warning" onClick={handleAddNationalUniversities}>
          Agregar universidades nacionales
        </Button>
        <Button variant="warning" onClick={handleConvertBasicProfile}>
          Perfiles básicos =&gt; Perfiles completos
        </Button>
        <Button
          variant="warning"
          onClick={() => openPopup("", UniversitiesAddPensum)}
        >
          Agregar pensums
        </Button>
        <br />
        <br />
        <Button
          variant="warning"
          onClick={() => openPopup("", UniversitiesUpdateInfo)}
        >
          Actualizar información de universidades
        </Button>
      </div>
      <div className={styles.universities}>
        {universities.map((u, i) => (
          <UniversitiesWithOptions university={u} key={i} />
        ))}
      </div>
    </>
  );
}
export default Universities;
