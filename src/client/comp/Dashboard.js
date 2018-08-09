import React, { Component } from "react";
import Header from "./Header";
import { Redirect } from 'react-router-dom'
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

        const { isLoading, token } = this.state;

        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }
        if (token) {
            return (
                <div>
                    <Header isAuth={true} />
                    Dashboard

                <button onClick={this.logout}>Logout</button>
                </div>
            )
        }

        return (
            <div>
                <Redirect to='/signin' />
            </div>
        );

        // const { isLoading, token } = this.state;

        // if (isLoading) {
        //     return (<div><p>Loading...</p></div>);
        // }

        // if (!token) {
        //     return (
        //         <div>
        //             <Header />
        //         </div>
        //     )
        // }

        // return (
        //     <div>
        //         <Dashboard />
        //     </div>
        // );
    }
}
