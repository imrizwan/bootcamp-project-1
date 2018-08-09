import React, { Component } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Header from "./Header";
import { Link } from "react-router-dom";
import { getFromStorage, setInStorage } from "../utils/storage";

const url = `http://localhost:8080/api/`;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
    }
  }

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

    const { isLoading, token } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          <Header />
        </div>
      )
    }

    return (
      <div>
        <Header isAuth={true} />
      </div>
    );
  }
}
