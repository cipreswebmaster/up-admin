import getFromAPI from "./getFromAPI";

function getAcreditaciones() {
  return getFromAPI("acreditaciones");
}
export default getAcreditaciones;
