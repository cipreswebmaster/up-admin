import { useEffect, useContext } from "react";
import PostsContext from "contexts/PostsContext";

import getFromAPI from "services/getFromAPI";

function usePosts() {
  const { content, setContent, loaded } = useContext(PostsContext);

  useEffect(() => {
    getFromAPI("get_posts").then((res) => {
      setContent(res);
    });
    // eslint-disable-next-line
  }, []);

  return {
    posts: content,
    setPosts: setContent,
    postsLoaded: loaded,
  };
}
export default usePosts;
