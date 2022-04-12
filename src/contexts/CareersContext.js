import { createContext } from "react";
import BaseContext from "./BaseContext";

const Context = createContext([]);

export function CareersContextProvider({ children }) {
  const CareersContext = BaseContext(Context, children);

  return CareersContext;
}

export default Context;
