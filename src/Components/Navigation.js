import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import "./Navigation.css"
import { useContext } from "react";
import { useRef } from "react";
import { Auth } from "./Context/Context";

const Navigation = () => {
  const ctx = useContext(Auth);
  const nameInput = useRef();
  const urlInput = useRef();
  const FormHandler=(e)=>{
    e.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredUrl = urlInput.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZp7ZxdFMWRYpSyvgpT1IBvO9LeORpmok',{
      method:'POST',
      body:JSON.stringify({
        idToken:ctx.token,
        displayName:enteredName,
        photoUrl:enteredUrl,
        deleteAttribute:null,
        returnSecureToken:true,
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
      ctx.login(data.idToken)
      console.log(data);
      
      
       
    })
    .catch((err) => {
      alert(err.message);
      console.log(err.message);
    });

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAZp7ZxdFMWRYpSyvgpT1IBvO9LeORpmok',{
      method:"GET",
      body:JSON.stringify({
        idToken:ctx.token,
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
      ctx.login(data.idToken)
      console.log(data);  
    })
    .catch((err) => {
      alert(err.message);
      console.log(err.message);
    });

  
    
  }
  


  return (
    <Fragment>


    <div className="navigation"  >
      <div>
        <p>Winner never quite,Quitter never win</p>
      </div>
      <div className="color">
        <p>
          Your Profile is <strong>64%</strong> completed. A complete Profile has <br />
          higher chances of landing a job{" "}
          <Link to="/profile">Complete now </Link>{" "}
        </p>
      </div>
    </div>
    <form onSubmit={FormHandler} >
      <h3>Contact Details</h3>
      <label htmlFor=""> <i class="fa-brands fa-github "></i>  Full Name: </label>
      <input type="text"  ref={nameInput}  />
      <label htmlFor=""><i class="fa-solid fa-globe"></i>Profie Photo Url : </label>
      <input type="url"  ref={urlInput} />
      <br />
      <button  > Submit </button>
    </form>
    </Fragment>
  );
};

export default Navigation;
