import React, { Component } from "react";
import Header from "./Header";
import './SignUp.css';
import { getFromStorage, setInStorage } from "../utils/storage";

var url = `http://localhost:8080/api/`;
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      signUpError: "",
    };
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    const { username, email, password } = this.state;
    // post request

    fetch(url + 'signup', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(json => {

        if (json.success) {
          console.log(json.message);
          console.log(json.success);
          this.setState({
            signUpError: json.message,
          })
        } else {
          this.setState({
            signUpError: json.message,
          })
        }
      })
  };

  render() {

    const { signUpError, username, email, password } = this.state;

    return (
      <div>
        <Header />
        <div className="jumbotron jumbotron-fluid Signup">
          <div className="container">
            {
              (signUpError) ? (
                <div className="alert alert-primary" role="alert">
                  {signUpError}
                </div>
              ) : (null)
            }
            <h1 className="display-4">Sign Up</h1>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text lead" id="inputGroup-sizing-lg">Username</span>
              </div>
              <input
                type="text"
                name="username"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Username"
                value={username}
              />
            </div>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text lead" id="inputGroup-sizing-lg">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Email"
                value={email}
              />
            </div>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text lead" id="inputGroup-sizing-lg">Password&nbsp;</span>
              </div>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Password"
                value={password}
              />
            </div>
            <button className="btn btn-outline-primary btn-lg lead" onClick={this.onClick}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}
