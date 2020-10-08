import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage'
import './styles/homePage.scss';
import SignIn from './pages/SignIn';
import db from './firebase';
import Interests from './pages/Interests';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './pages/LandingPage';



const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  constructor() {
    super();
    this.state={
        logged: undefined,
        logged: undefined
      }
  }


  componentDidMount() {
     db.auth().onAuthStateChanged( async(user) => {
        if (user) {   
            this.setState({logged : true })
          } else {
            this.setState({logged : false })
        }
    })
}

  render() {
      return (
        
        <BrowserRouter basename={getBasename()}>
            <Switch>
              <Route exact path='/landing'  component={LandingPage}/>
              <Route exact path='/' component={this.state.logged ? HomePage : SignIn } />
              <Route exact path='/login'  component={SignIn}/>
              <Route exact path='/interests'  component={this.state.logged ? Interests : SignIn } />
          </Switch>
        </BrowserRouter>
    );
      
  }
}


export default App;
