import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register'
import { Container } from 'semantic-ui-react'
import Menubar from './component/Menubar'
import { AuthProvider } from './context/auth';
import AuthRoute from './until/AuthRoute';
const App = () =>{
  return(
    <AuthProvider>
       <Router>
    <Container>
      <Menubar/>
      <Route exact path='/' component={Home}/>
    <AuthRoute exact path='/login' component={Login}/>
    <AuthRoute exact path= '/register' component={Register}/>
    </Container>
   
  </Router>
    </AuthProvider>
 
  )
}

export default App;