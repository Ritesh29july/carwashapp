import React, { Component } from 'react';


import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import {Navigation} from './Navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Customer from './Customer';
import Washer from './Washer';
class Admin extends Component {
	
    render(){
        return(
       <BrowserRouter>
   	 <div className="container">
      
      <Navigation/>

      <Switch>
      <Route path='/customer' component={Customer}/>

      <Route path='/washer' component={Washer}/>
      </Switch>

    </div>
    </BrowserRouter>

        )
    }
}

export default Admin;