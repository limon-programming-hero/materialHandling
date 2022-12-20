import React from 'react';
import './App.css';
import MinTotCost from './component/MinTotCost/MinTotCost';
import TechImpFin from './component/TechImpFin/TechImpFin';
import TechImpInfin from './component/TechImpInfin/TechImpInfin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <h4>
          <Link className='linkStyle' to="/MinTotCost">Minimization of Total Cost</Link>
        </h4>
        <h4>
          <Link className='linkStyle' to="/TechImpFin">Technological Improvement : Finite Planning Horizon</Link>
        </h4>
        <h4>
          <Link className='linkStyle' to="/TechImpInfin">Technological Improvement : Infinite Planning Horizon</Link>
        </h4>
        <Switch>
          <Route path='/MinTotCost'>
            <MinTotCost />
          </Route>
          <Route path='/TechImpFin'>
            <TechImpFin />
          </Route>
          <Route path='/TechImpInfin'>
            <TechImpInfin />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
