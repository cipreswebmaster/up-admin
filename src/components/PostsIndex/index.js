import { Link } from "react-router-dom";
import usePosts from "hooks/usePosts";
import PostWithOptions from "components/PostWithOptions";

import styles from "./index.module.scss";

function PostsIndex({ match: { path } }) {
  const { posts, setPosts } = usePosts();

  function handlePostDeleted(idx) {
    const _posts = posts.slice();
    _posts.splice(idx, 1);
    setPosts(_posts);
  }

  return (
    <div className={styles.posts}>
      <div className={styles.action_buttoms}>
        <Link to={`${path}/new`}>Hacer publicación nueva</Link>
      </div>
      <div className={styles.posts}>
        {posts.map((post, idx) => (
          <PostWithOptions
            key={idx}
            post={post}
            onPostDeleted={() => handlePostDeleted(idx)}
          />
        ))}
      </div>
    </div>
  );
}
export default PostsIndex;
