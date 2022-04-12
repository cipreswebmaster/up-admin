import { createContext } from "react";
import BaseContext from "./BaseContext";

const Context = createContext([]);

export function UsersContextProvider({ children }) {
  return BaseContext(Context, children);
}

export default Context;
