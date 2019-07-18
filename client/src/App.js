import React, { Component } from 'react';
import { BrowserRouter as Router,  NavLink, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import UploadPage from './components/UploadPage';
import ViewPage from './components/ViewPage';



class App extends Component {

  render() {
    return (
      <Router>
   <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">Task</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <NavLink className="nav-link" to="/" exact >Upload Images</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link"  to="/images" exact >View Images</NavLink>
          </li>
            </ul>
        </div>
        </nav>
      
  
      <Switch>
        <Route path="/" exact strict component={UploadPage} />
        <Route path="/images" exact strict component={ViewPage} />

        </Switch>
  </div>
      </Router>
    );
  }
}

export default App;
