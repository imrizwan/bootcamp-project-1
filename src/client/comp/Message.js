import React from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../utils/storage";
import './Message.css';
import { url } from '../Variables';

// var socket = require('socket.io-client')('http://localhost:8080');
// socket.on('connect', function () {
//     console.log("Client Connected");
// });

class Message extends React.Component {
    constructor(props) {
        const ad = getFromStorage('ad');
        const obj = getFromStorage('olx');
        super(props)
        this.state = {
            Aduser: ad ? ad.username : '',
            AduserId: ad ? ad.userId : '',
            currentUser: obj ? obj.username : '',
            currentUserId: obj ? obj.userId : '',
            message: '',
            msgArrive: [],
            details: {},
            sender: '',
            error: '',
        }
    }

    componentWillMount() {

        // socket.on('chat message', (details) => {
        //     let a = [...this.state.msgArrive, [details.currentUser, details.message]]
        //     console.log(a);
        //     this.setState({ msgArrive: a })
        // });
    }

    //componentWillMount() {
    // if (ad) {

    //     fetch(url + 'getuserbyid', {
    //         method: 'POST',
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //         },
    //         body: JSON.stringify({
    //             Aduser: ad.userId
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             if (json.success) {
    //                 this.setState({
    //                     success: json.success,
    //                     Aduser: json.username,
    //                     AduserId: json._id
    //                 })
    //                 console.log(json.username + json._id);
    //             } else console.log(json.success + "User Not Found!");
    //         })
    //         .catch((err) => console.log("ERROR: ", err))
    // }
    //}

    onChange = (e) => {
        this.setState({ message: e.target.value });
    }

    onClick = () => {
        const {
            Aduser,
            AduserId,
            currentUser,
            currentUserId,
            message,
            msgArrive
        } = this.state;
        let details = {
            Aduser,
            AduserId,
            currentUser,
            currentUserId,
            message,
            msgArrive
        }

        socket.emit('chat message', details);
        this.setState({ message: '' })
    }

    render() {

        return (
            <div>
                <h1>Messages</h1>

                <hr />

                <div className="jumbotron jumbotron-fluid" style={{ margin: '0 auto', width: '90%', borderRadius: '4px', border: '2px solid black' }}>
                    <div className="container border">
                        <div className="row">
                            <div className="col-2">
                                Messages from DB
                            </div>
                            <div className="col-10">
                                <div className="messageBox" id="messageBox">
                                    {/*this.state.currentUser && this.state.msgArrive ? this.state.msgArrive.map((msg, index) => <div style={{ marginLeft: '20px' }} key={index}>{msg[0]} - {msg[1]}</div>) : null*/}
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