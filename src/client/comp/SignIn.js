import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { Redirect } from 'react-router-dom'
import './SignUp.css';
import { getFromStorage, setInStorage } from "../utils/storage";

var url = `http://localhost:8080/api/`;
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      signInError: "",
      token: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    const obj = getFromStorage('olx');
    if (obj && obj.token) {
      const { token } = obj;
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    const { email, password } = this.state;
    // post request

    fetch(url + 'signin', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(json => {

        if (json.success) {
          setInStorage('olx', { token: json.token })
          this.setState({
            signInError: json.message,
            token: json.token
          })
        } else {
          this.setState({
            signInError: json.message,
          })
        }
      })
  };

  render() {

    const { signInError, email, password, isLoading, token } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          <Header isAuth={false} />
          <div className="jumbotron jumbotron-fluid Signup">
            <div className="container">
              {
                (signInError) ? (
                  <div className="alert alert-primary" role="alert">
                    {signInError}
                  </div>
                ) : (null)
              }
              <h1 className="display-4">Sign In</h1>
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
              <button className="btn btn-outline-primary btn-lg lead" onClick={this.onClick}>Sign In</button>
            </div>
          </div>
        </div>
      );
    }


    return (
      <div>
        <Redirect to='/dashboard' />
      </div>
    );
  }
  //this.props.history.push('/dashboard');
}
