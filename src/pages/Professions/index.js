import { Switch, Route } from "react-router-dom";
import ProfessionsIndex from "components/ProfessionsIndex";

function Professions({ match: { path } }) {
  return (
    <Switch>
      <Route exact path={path} component={ProfessionsIndex} />
    </Switch>
  );
}
export default Professions;
