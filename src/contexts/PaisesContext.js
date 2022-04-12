import { createContext } from "react";
import BaseContext from "./BaseContext";

const Context = createContext([]);

export function PaisesContextProvider({ children }) {
  const PaisesContext = BaseContext(Context, children);
  return PaisesContext;
}

export default Context;
