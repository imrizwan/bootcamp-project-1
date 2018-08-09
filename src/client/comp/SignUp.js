import React, { Component } from "react";
import Header from "./Header";
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
      isLoading: true,
      token: '',
    };
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    const { username, email, password } = this.state;
    console.log(username, email);
    // post request

    this.setState({
      isLoading: true
    });

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
          this.setState({
            signUpError: json.message,
            isLoading: false
          })
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          })
        }
      })
  };


  componentDidMount() {
    const token = getFromStorage('olx');
    if (token) {
      //Verify token here
      fetch(url + "verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        })
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {

    const { signUpError, username, email, password, isLoading, token } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          {
            (signUpError) ? <p>{signUpError}</p> : (null)
          }
          <h1>Sign Up</h1>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            value={username}
          />
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Email"
            value={email}
          />
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            value={password}
          />
          <button onClick={this.onClick}>Submit</button>
        </div>
      );

      return (
        <div>
          <Header isAuth={true} />
        </div>
      );
    }
  }
}