/**
 * Devuelve un objeto tipo FormData a partir de un objeto JSON
 *
 * @param {{}} obj Objeto que será convertido en un elemento del tipo FormData
 * @returns FormData
 */
function getFormDataFromObj(obj) {
  if (typeof obj !== "object") {
    throw new Error(
      `Se espara un objeto como parámetro. Se está recibiendo un elemento de tipo ${typeof obj}`
    );
  }

  const keys = Object.keys(obj);
  const fd = new FormData();
  keys.forEach((key) => {
    fd.append(key, obj[key]);
  });
  return fd;
}
export default getFormDataFromObj;
