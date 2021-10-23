import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Namespaces from './pages/Namespaces'

function App() {
  return (
    <Router>
        <Switch>
            <Route path='/namespaces'><Namespaces/></Route>
        </Switch>
    </Router>
  );
}

export default App;
