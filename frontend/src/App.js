import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Namespaces from "./pages/Namespaces";
import Keys from "./pages/Keys";
import Swagger from "./pages/Swagger";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/namespaces">
          <Namespaces />
        </Route>
        <Route path="/keys">
          <Keys />
        </Route>

        <Route path="/swagger">
          <Swagger />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
