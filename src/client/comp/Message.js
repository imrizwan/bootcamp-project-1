import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../utils/storage";

const url = `http://localhost:8080/api/`;

export default class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Aduser: '',
            currentUser: ''
        }
    }

    componentWillMount() {
        const obj = getFromStorage('olx');
        if (obj && obj.username) {
            const { username } = obj;
            this.setState({
                currentUser: username
            })
        }
        if (this.props.location.state.referrer) {

            fetch(url + 'getuserbyid', {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    Aduser: this.props.location.state.referrer.userId
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            success: json.success,
                            Aduser: json.user
                        })
                    } else console.log(json.success + "User Not Found!");
                })
                .catch((err) => console.log("ERROR: ", err))
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.Aduser + this.state.currentUser}</h1>
                <Link to="/">Go to Home</Link>
            </div>
        )
    }
}