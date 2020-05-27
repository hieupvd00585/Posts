import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register'
import { Container } from 'semantic-ui-react'
import Menubar from './component/Menubar'

const App = () =>{
  return(
    
  <Router>
    <Container>
      <Menubar/>
      <Route exact path='/' component={Home}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path= '/register' component={Register}/>
    </Container>
   
  </Router>
  )
}

export default App;