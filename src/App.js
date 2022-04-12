import { Switch, Route } from "react-router-dom";
import Index from "pages/Index";
import Users from "pages/Users";
import Posts from "pages/Posts";
import Professions from "pages/Professions";
import Universities from "pages/Universities";

import { CareersContextProvider } from "contexts/CareersContext";
import { UsersContextProvider } from "contexts/UsersContext";
import { PostsContextProvider } from "contexts/PostsContext";
import { UniversitiesContextProvider } from "contexts/UniversitiesContext";

function App(props) {
  return (
    <main {...props} style={{ padding: "25px" }}>
      <Switch>
        <UsersContextProvider>
          <CareersContextProvider>
            <UniversitiesContextProvider>
              <PostsContextProvider>
                <Route exact path="/" component={Index} />
                <Route path="/posts" component={Posts} />
                <Route path="/professions" component={Professions} />
                <Route path="/users" component={Users} />
                <Route path="/universities" component={Universities} />
              </PostsContextProvider>
            </UniversitiesContextProvider>
          </CareersContextProvider>
        </UsersContextProvider>
      </Switch>
    </main>
  );
}

export default App;
