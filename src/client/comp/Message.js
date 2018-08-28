import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../utils/storage";
import './Message.css';
const url = `http://localhost:8080/api/`;

var socket = require('socket.io-client')('http://localhost:8080');
socket.on('connect', function () {
    console.log("Client Connected");
});

class Message extends React.Component {
    constructor(props) {
        const ad = getFromStorage('ad');
        super(props)
        this.state = {
            Aduser: ad ? ad.username : '',
            AduserId: ad ? ad.userId : '',
            currentUser: '',
            currentUserId: '',
            message: '',
            msgArrive: [],
            details: {},
            sender: ''
        }
    }

    componentDidMount() {
        socket.on('chat message', (details) => {
            //console.log(details.message)
            //const newChats = reset ? [chat] : [...chats, chat]
            let a = [...this.state.msgArrive, [details.currentUser, details.message]]
            console.log(details.currentUser);
            this.setState({ msgArrive: a })
        });
    }

    componentWillMount() {
        const obj = getFromStorage('olx');
        const ad = getFromStorage('ad');
        if (obj && obj.username && obj.userId) {
            const { username, userId } = obj;
            this.setState({
                currentUser: username,
                currentUserId: userId
            })
        }

        if (ad) {

            fetch(url + 'getuserbyid', {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    Aduser: ad.userId
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            success: json.success,
                            Aduser: json.username,
                            AduserId: json._id
                        })
                        console.log(json.username + json._id);
                    } else console.log(json.success + "User Not Found!");
                })
                .catch((err) => console.log("ERROR: ", err))
        }
    }

    onChange = (e) => {
        this.setState({ message: e.target.value });
    }

    onClick = () => {
        const {
            Aduser,
            AduserId,
            currentUser,
            currentUserId,
            message
        } = this.state;
        let details = {
            Aduser,
            AduserId,
            currentUser,
            currentUserId,
            message
        }

        socket.emit('chat message', details);

        // fetch(url + 'message', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json",
        //     },
        //     body: JSON.stringify(
        //         {
        //             Aduser: Aduser,
        //             AduserId: AduserId,
        //             currentUser: currentUser,
        //             currentUserId: currentUserId,
        //             message: message
        //         })
        // })
        //     .then(res => res.json())
        //     .then(json => {
        //         console.log(json);
        //     })
    }

    render() {

        return (
            <div>
                <h1>{this.state.Aduser + this.state.currentUser}</h1>

                <hr />

                <div className="jumbotron jumbotron-fluid" style={{ margin: '0 auto', width: '90%', borderRadius: '4px', border: '2px solid black' }}>
                    <div className="container border">
                        <div className="row">
                            <div className="col-2">
                                Messages from DB
                            </div>
                            <div className="col-10">
                                <div className="messageBox" id="messageBox">
                                    {this.state.currentUser && this.state.msgArrive ? this.state.msgArrive.map((msg, index) => <div style={{ marginLeft: '20px' }} key={index}>{msg[0]} - {msg[1]}</div>) : null}
                                    <br />
                                    <div className="messageField">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" value={this.state.message} onChange={this.onChange} placeholder="Type Message..." aria-label="Type Message..." aria-describedby="button-addon2" />
                                            <div className="input-group-append">
                                                <button onClick={this.onClick} className="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <Link to="/">Go to Home</Link>
            </div>
        )
    }
}

export default Message;