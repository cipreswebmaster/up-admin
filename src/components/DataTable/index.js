import { Fragment } from "react";

import styles from "./index.module.scss";

function DataTable({ headers, data }) {
  function getTableCellContent(info) {
    return typeof info === "boolean" ? (info ? "Sí" : "No") : info;
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{h.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i} className={styles.tr}>
            {Object.keys(d).map((f, i2) => {
              if (!i2) return <Fragment key={i2}></Fragment>;

              const isInTheRigthColumn = headers[i2 - 1].target === f;
              return isInTheRigthColumn ? (
                <td key={i2} className={styles.td}>
                  {getTableCellContent(d[f])}
                </td>
              ) : (
                <Fragment key={i2}></Fragment>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default DataTable;
