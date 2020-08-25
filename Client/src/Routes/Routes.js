import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "../Home";
//import Login from "../Login";
import Board from "../Board/Board";

const Routes = () => (
    <Router>
        <Route exact path="/" component={Home} />
        
        <Route path="/board" component={Board} />
    </Router>
);

export default Routes;