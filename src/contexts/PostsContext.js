import { createContext } from "react";
import BaseContext from "./BaseContext";

const Context = createContext([]);

export function PostsContextProvider({ children }) {
  const PostsContext = BaseContext(Context, children);
  return PostsContext;
}

export default Context;
