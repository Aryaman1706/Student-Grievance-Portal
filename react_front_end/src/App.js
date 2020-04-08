import React, { Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Add from './components/Add';
import Register from './components/Register';
import Login from './components/Login';
import AuthState from './context/AuthState';
import SetAuthToken from './utils/SetAuthToken';
import AlertState from './context/AlertState';
import Alert from './components/Alert';

if(localStorage.token){
  SetAuthToken(localStorage.token);
}


class App extends Component{
  render(){
    return(
      <AuthState>
      <AlertState>
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Alert/>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/add' component={Add} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        </Switch>
        
      </div>
      </BrowserRouter>
      </AlertState>
      </AuthState>
    )
  }
}


export default App;
