import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignUp from './components/SignUp';
import Homepage from './pages/homepage';
import StudentRegisterMain from './Student/Register/studentRegisterMain';
import AddJob from './Admin/addJob';

function App() {
  return (
    <Router>
      {/* <StudentRegisterMain/> */}
      {/* <AddJob/> */}
      <Switch>
        <Route exact path="/" render={()=><Homepage/>}></Route>
        <Route exact path="/signup" render={()=><SignUp/>}></Route>
        <Route exact path={`/:id`} component={StudentRegisterMain}></Route>
      </Switch>
    </Router>
  );
}

export default App;
