import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainMenuComponent from './components/MainMenuComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateShortUrlComponent from './components/CreateShortUrlComponent';
import RedirectComponent from './components/RedirectComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
        <div className="container">
          <Switch>
            <Route path="/" exact component={MainMenuComponent}></Route>
            <Route path="/shortUrl" component={MainMenuComponent}></Route>
            <Route path="/add-shortUrl/:id" component={CreateShortUrlComponent}></Route>
            <Route path="/view-shortUrl/:id" component={RedirectComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;
