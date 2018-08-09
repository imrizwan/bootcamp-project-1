import React, { Component } from "react";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      signInError: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {

    const { signInError, email, password } = this.state;

    return (
      <div>
        {
          (signInError) ? <p>{signInError}</p> : (null)
        }
        <h1>Sign In</h1>
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
          placeholder="Password"
        />
        <button>Sign In</button>
      </div>
    );
  }
}
