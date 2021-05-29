import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignUp from './components/SignUp';
import Homepage from './pages/homepage';
import StudentRegisterMain from './Student/Register/studentRegisterMain';
import AddJob from './Admin/addJob';
import JobFeed from './Student/JobFeed';
import AdminDashboard from './Admin/adminDashboard';
import StudentDashboard from './Student/StudentDashboard';

function App() {
  return (
    <Router>
      {/* <StudentRegisterMain/> */}
       <Switch>
        <Route exact path="/" render={()=><Homepage/>}></Route>
        <Route exact path="/signup" render={()=><SignUp/>}></Route>
        <Route exact path="/admin" component={AdminDashboard}></Route>
        <Route exact path={`/:id`} component={StudentDashboard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
