import { useLocation, Link } from "react-router-dom";

import styles from "./LateralMenuSection.module.scss";

function LateralMenuSection({ details }) {
  const { name, path } = details;
  const { pathname } = useLocation();

  const isInPath = pathname.indexOf(path) > -1;
  const itsExactPath = pathname === path;
  const linkClasses = [
    styles.section,
    isInPath && itsExactPath ? styles.disabled_link : undefined,
    isInPath ? styles.active : undefined,
  ];
  return (
    <Link to={path} className={linkClasses.join(" ")}>
      {name}
    </Link>
  );
}
export default LateralMenuSection;
