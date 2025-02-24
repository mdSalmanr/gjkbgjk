import React, { useState } from "react";
import "./HomePage.css";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "./Context/Context";
import { Link } from "react-router-dom";
import ExpenseUI from "./ExpenseUI";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { expensesActions } from "./Store";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.expenses.isPremium);
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const AmountChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const TypeChangeHandler = (e) => {
    setType(e.target.value);
  };
  const CategoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };
  const AddExpense = (e) => {
    e.preventDefault();
    const data = {
      price: price,
      type: type,
      category: category,
    };
    dispatch(expensesActions.addExpense(data));
    props.saveExpense(data);
    setCategory("");
    setPrice("");
    setType("");
  };

  const ctx = useContext(Auth);
  const history = useHistory();
  const LogOut = () => {
    ctx.logout();
    history.replace("/");
  };
  const ButtonHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAZp7ZxdFMWRYpSyvgpT1IBvO9LeORpmok",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: ctx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
        ctx.login(data.idToken);
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
  };
  return (
    <>
      <div className="expense">
        <div>
          <p>Welcome to Expense Tracker!!!</p>
        </div>
        <div className="colo">
          <p>
            Your Profile Is Incomplete <Link to="/profile">Complete now </Link>{" "}
          </p>
        </div>
      </div>
      <button onClick={ButtonHandler}>VerifyEmailId</button>
      <button onClick={LogOut}>Logout</button>

      <form onSubmit={AddExpense} className="form3">
        <label htmlFor="">Amount: </label>
        <input type="tel" onChange={AmountChangeHandler} value={price} />
        <br />
        <label htmlFor="">Expense Type:</label>
        <input type="text" onChange={TypeChangeHandler} value={type} />
        <br />

        <label htmlFor="">Category:</label>
        <select value={category} onChange={CategoryChangeHandler}>
          <option value="Food"> Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>
        <br />
        <button>Add Expense</button>
      </form>
      {isPremium && <button>Activate premium</button>}
      <h2>Expenses</h2>
      <ExpenseUI expenses={props.expense} />
    </>
  );
};

export default HomePage;
