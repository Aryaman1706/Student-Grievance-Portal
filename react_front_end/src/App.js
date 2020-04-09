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
import AcademicFilter from './components/AcademicFilter';
import InfraFilter from './components/InfraFilter';
import ServicesFilter from './components/ServicesFilter';
import OthersFilter from './components/OthersFilter';

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
        <Route exact path='/academics' component={AcademicFilter} />
        <Route exact path='/infrastructure' component={InfraFilter} />
        <Route exact path='/services' component={ServicesFilter} />
        <Route exact path='/others' component={OthersFilter} />
        </Switch>
        
      </div>
      </BrowserRouter>
      </AlertState>
      </AuthState>
    )
  }
}


export default App;
