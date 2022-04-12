import { useState } from "react";

/**
 * Crea un objeto contexto con los estados básicos ya creados y algunos valores adicionales
 *
 * @param {React.Context<{}>} Context El objeto del contexto a ser creado.
 * @param {React.ReactElement} children The content that will be inside de Context.Provider
 * @param {{}} [additionalValues] Valores adicionales a ser agregados al contexto
 * @returns El objeto Context ya creado
 */
function BaseContext(Context, children, additionalValues = {}) {
  const [content, setContent] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function _setContent(content) {
    setContent(content);
    if (!loaded) setLoaded(true);
  }

  return (
    <Context.Provider
      value={{
        content,
        setContent: _setContent,
        loaded,
        ...additionalValues,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export default BaseContext;
