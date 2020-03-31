import React, { Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Add from './components/Add';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/add' component={Add} />
        </Switch>
        
      </div>
      </BrowserRouter>
    )
  }
}


export default App;
