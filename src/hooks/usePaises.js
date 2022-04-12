import { useEffect, useContext } from "react";
import PostsContext from "contexts/PostsContext";

import getPaises from "services/getPaises";

function usePosts() {
  const { content, setContent, loaded } = useContext(PostsContext);

  useEffect(() => {
    getPaises().then((res) => {
      setContent(res);
    });
    // eslint-disable-next-line
  }, []);

  return {
    paises: content,
    paisesLoaded: loaded,
  };
}
export default usePosts;
