import { Switch, Route } from "react-router-dom";
import Index from "components/PostsIndex";
import NewPost from "components/PostsNewPost";
import EditPost from "components/PostEditPost";

function Posts({ match: { path } }) {
  return (
    <Switch>
      <Route exact path={path} component={Index} />
      <Route path={`${path}/new`} component={NewPost} />
      <Route path={`${path}/edit/:title`} component={EditPost} />
    </Switch>
  );
}
export default Posts;
