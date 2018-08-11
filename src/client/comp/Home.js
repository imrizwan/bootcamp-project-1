import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import { getFromStorage, setInStorage } from "../utils/storage";
import Loader from './loader';
import SecureHeader from './secureHeader';

const url = `http://localhost:8080/api/`;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: '',
            username: ''
        }
    }
    componentWillMount() {
        const obj = getFromStorage('olx');
        if (obj && obj.token) {
            const { token, username } = obj;
            //Verify token here
            fetch(url + "verify?token=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: token,
                            username: username,
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

    logout = () => {

        this.setState({
            isLoading: true
        });

        const obj = getFromStorage('olx');
        if (obj && obj.token) {
            const { token } = obj;
            //Verify token here
            fetch(url + "logout?token=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: '',
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

        const { isLoading, token, username } = this.state;

        if (isLoading) {
            return (<Loader />);
        }

        if (token) {
            return (
                <div>
                    <Header isAuth={true} />
                    <SecureHeader logout={this.logout} username={username} />
                </div>
            )
        }

        return (
            <div>
                <Header isAuth={false} />
            </div>
        );
    }
}
