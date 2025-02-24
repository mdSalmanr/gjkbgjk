import React, { useEffect, useState } from 'react';
import './App.css'
import SignUpForm from './Components/SignUpForm';

import {Switch,Route} from 'react-router-dom';
import HomePage from './Components/HomePage';
import Layout from    './Components/Layout';
import Navigation from './Components/Navigation';
import ForgotPassword from './Components/ForgotPassword';

function App() {
  const [email,setEmail] = useState('');
  const [expense,setExpense] = useState([]);
  const ExpenseHandler =async (expenses)=>{
    const Response = await fetch('https://expense1-c61b5-default-rtdb.firebaseio.com/expense.json',{
      method:'POST',
      body:JSON.stringify(expenses),
      headers:{
        'Content-type':'appliaction/json'
      }
    })

    const data1 = Response.json();
    console.log(data1);
    setExpense((prev)=>[...prev,expenses])

  }
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(
        "https://expense1-c61b5-default-rtdb.firebaseio.com/expense.json"
      );
      const data = await response.json();

      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          ...data[key],
        });
      }
      setExpense(loadedExpenses);
    };

    fetchExpenses();
  }, []);
  
   
  return (
      //<Layout>
      <Switch>
        <Route path='/' exact> <SignUpForm setEmail={setEmail}   /> </Route>
        <Route path='/login'> <HomePage email={email}   saveExpense={ExpenseHandler} expense={expense}  /> </Route>
        <Route path='/profile' ><Navigation/>   </Route>
        <Route path='/forgot' ><ForgotPassword/>   </Route>
      </Switch>
      //</Layout>  
  );
}

export default App;
