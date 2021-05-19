import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignUp from './components/SignUp';
import Homepage from './pages/homepage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={()=><Homepage/>}></Route>
        <Route exact path="/signup" render={()=><SignUp/>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
