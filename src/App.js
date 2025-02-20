import React, { useState } from 'react';
import './App.css'
import SignUpForm from './Components/SignUpForm';

import {Switch,Route} from 'react-router-dom';
import HomePage from './Components/HomePage';
import Layout from    './Components/Layout';
import Navigation from './Components/Navigation';

function App() {
  const [email,setEmail] = useState('');
  return (
      //<Layout>
      <Switch>
        <Route path='/' exact> <SignUpForm setEmail={setEmail}  /> </Route>
        <Route path='/login'> <HomePage email={email}  /> </Route>
        <Route path='/profile' ><Navigation/>   </Route>
      </Switch>
      //</Layout>  
  );
}

export default App;
