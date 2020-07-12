import React from 'react';
import './App.css';
//import Routes from '../Routes/Routes';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Board from "../Board/Board";

import Login from "../Login";
import Registration from "../Registration";
import Logout from '../Issue/Logout';
import Dashboard from '../Issue/Dashboard';
import CreateBoard from '../Board/CreateBoard';
import Home from '../Home';
import PrivateRoute from '../PrivateRoute';
import CreateTeam from '../CreateTeam';
import Team from '../Team/Team';
import TeamRequest from '../Team/TeamRequest';

import GetBoardData from '../Board/GetBoardData';
import TopAppBar from '../TopAppBar';



/* export default class App extends Component{

  render() {
    return (
          <Routes />
    );
  }

  
} */

function App() {

  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/board" component={GetBoardData} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/board-create" component={CreateBoard} />
          <Route path="/team-create" component={CreateTeam} />
          <Route path="/team-request" component={TeamRequest} />
          <Route path="/team" component={Team} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;