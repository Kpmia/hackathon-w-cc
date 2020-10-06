import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage'
import './styles/homePage.scss';
import SignIn from './pages/SignIn';



const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {


  render() {
    return (
      
      <BrowserRouter basename={getBasename()}>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={SignIn} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
