import axios from "axios";
import React, { useState } from "react";

const Login = (props) => {
  const { push } = props.history;

  const initialFormValues = {
    username: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", formValues)
      .then((res) => {
        console.log("login res: ", res);
        setError("");
        localStorage.setItem("token", res.data.payload);
        push("/bubbles");
      })
      .catch((err) => {
        setError("Username or Password not valid");
      });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Log in: </h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              id="username"
              value={formValues.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </label>
          <button id="submit">Log in</button>
        </form>
      </div>

      <p id="error" className="error">
        {error}
      </p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"
