import React from 'react';

import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';

import ListDoctor from './pages/doctor/listDoctor';
import EditDoctor from './pages/doctor/editDoctor';
import InsertDoctor from './pages/doctor/insertDoctor';
import DeleteDoctor from './pages/doctor/deleteDoctor';
import SignIn from './pages/user/signin';
import Register from './pages/user/register';
import Home from './pages/home/home';
import ListAppointment from './pages/appointment/listAppointment';
import InsertAppointment from './pages/appointment/insertAppointment';
import EditAppointment from './pages/appointment/editAppointment';

function App() {
  return (
      
      <Router>
        <Switch>
            <Route  exact path="/" component={SignIn}/>  
            <Route  exact path="/register" component={Register}/>  
            <Route  exact path="/validatePassword/:login/:password" component={Home}/>  
            <Route  exact path="/home" component={Home}/>  

            <Route  path="/doctor/list" component={ListDoctor}/>
            <Route  path="/doctor/insert" component={InsertDoctor}/>
            <Route  path="/doctor/edit/:id" component={EditDoctor}/>
            <Route  path="/doctor/delete/:id" component={DeleteDoctor}/>

            <Route  path="/appointment/list" component={ListAppointment}/>
            <Route  path="/appointment/insert" component={InsertAppointment}/>
            <Route  path="/appointment/edit/:id" component={EditAppointment}/>
            <Route  path="/appointment/delete/:id" component={DeleteDoctor}/>
        </Switch>
      </Router>
  )
}

export default App;
