import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Auth } from "./Context/Context";
import { useHistory } from "react-router-dom";
import HomePage from "./HomePage";
import { useDispatch } from "react-redux";
import { AuthAction } from "./Store";


const SignUpForm = ({ setEmail }) => {
  const dispatch = useDispatch();
  const Authctx = useContext(Auth);
  const [login, setLogin] = useState(true);
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const SwitchAuth = () => {
    setLogin((prevState) => !prevState);
  };

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url;

    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZp7ZxdFMWRYpSyvgpT1IBvO9LeORpmok";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZp7ZxdFMWRYpSyvgpT1IBvO9LeORpmok";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
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
            console.log(data);
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
        dispatch(AuthAction.login({token:data.idToken}));
        //Authctx.login(data.idToken);
        console.log(data);
        setEmail(enteredEmail);
        history.replace("/login");
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
  };

  return (
    <div className="form1">
      <form onSubmit={FormSubmitHandler} className="form2">
        <h2>{login ? "Login" : "Sign Up"}</h2>
        <div>
          <input type="email" placeholder="Email" ref={emailInputRef} />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            ref={passwordInputRef}
          />
        </div>

        <button>
          {" "}
          <Link to="/forgot"> Forgot Password </Link>{" "}
        </button>
        <button>{login ? "Login" : "Create Account"}</button>
      </form>
      <div>
        <button onClick={SwitchAuth}>Create Account ?Sign Up</button>
      </div>
    </div>
  );
};

export default SignUpForm;
