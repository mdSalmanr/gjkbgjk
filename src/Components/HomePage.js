import React from 'react'
import "./HomePage.css"
import { useContext } from 'react'
import { Auth } from './Context/Context'
import { Link } from 'react-router-dom'

const HomePage = ({email}) => { 
  const ctx = useContext(Auth);
  const ButtonHandler=()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAZp7ZxdFMWRYpSyvgpT1IBvO9LeORpmok',{
      method:"POST",
      body:JSON.stringify({
        requestType:"VERIFY_EMAIL",
        idToken:ctx.token,
      }),headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        //setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data)
            let errormessage = "Authantication Failed";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            alert(errormessage);
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        ctx.login(data.idToken)
        console.log(data);
        
        
         
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    
  }
  return (
    <>
    <div className='expense' >
        <div>
            <p>Welcome to Expense Tracker!!!</p>
        </div>
        <div className='colo' >
            <p>Your Profile Is Incomplete <Link to='/profile'>Complete now   </Link>   </p>
        </div>
    </div>
    <button onClick={ButtonHandler} >VerifyEmailId</button>
    </>

  )
}

export default HomePage