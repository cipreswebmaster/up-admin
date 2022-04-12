import LateralMenuSection from "./LateralMenuSection";

import styles from "./index.module.scss";

function LateralMenu() {
  return (
    <nav className={styles.menu}>
      {SECTIONS.map((sec, idx) => (
        <LateralMenuSection details={sec} key={idx} />
      ))}
    </nav>
  );
}
export default LateralMenu;

const SECTIONS = [
  { name: "Publicaciones", icon: "", path: "/posts" },
  { name: "Profesiones", icon: "", path: "/professions" },
  { name: "Usuarios", icon: "", path: "/users" },
  { name: "Universidades", icon: "", path: "/universities" },
];
