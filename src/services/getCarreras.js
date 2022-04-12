import getFromAPI from "./getFromAPI";

function getCarreras() {
  return getFromAPI("profesiones");
}
export default getCarreras;
