import React from 'react'
import { useRef } from 'react';
import { useContext } from 'react';
import { Auth } from './Context/Context';

const ForgotPassword = () => {
    const Authctx =useContext(Auth);
    const email = useRef();
    const ForgotPasswords = (e)=>{
        const enteredemail = email.current.value;
        e.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAZp7ZxdFMWRYpSyvgpT1IBvO9LeORpmok',{
            method:'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:enteredemail,
            }),
            headers: {
                "Content-Type": "application/json",
              },
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
                Authctx.login(data.idToken)
                console.log(data);
                
                
                 
              })
              .catch((err) => {
                alert(err.message);
                console.log(err.message);
              });
          }; 
        

    



  return (
    <form onSubmit={ForgotPasswords} >
        <p>Enter the email with which you have registered</p>
        <input type="email" ref={email} />
        <button>Send Link</button>
    </form>
  )
}

export default ForgotPassword