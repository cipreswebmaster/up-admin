import { API_URL } from "./settings";
import getFormDataFromObj from "helpers/getFormDataFromObj";

/**
 * Ejecuta una consulta a la API de UP
 *
 * @param {string} file Nombre del archivo al que se referencia en la API
 * @param {{}} data Los datos que se mandaran en la petición
 * @returns El resultado de la API
 */
async function getFromAPI(file, data = {}) {
  return fetch(`${API_URL}/api/${file}`, {
    method: "POST",
    body: getFormDataFromObj(data),
  })
    .then((res) => res.json())
    .then((res) => Object.values(res))
    .catch((err) => ({
      error: true,
      msg: err,
    }));
}
export default getFromAPI;
