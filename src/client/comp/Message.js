import React from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../utils/storage";
import Header from "./Header";
import SecureHeader from './secureHeader';
import Loader from './loader';
import './Message.css';
import { Redirect } from 'react-router-dom'
import { url } from '../Variables';
import { connect } from 'react-redux';
import { startSubmitChat } from '../store/actions/chat';
import { database } from '../firebase/firebase';

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
            messages: '',
            msgArrive: '',
            details: {},
            sender: '',
            error: '',
            isLoading: true,
            token: '',
        }
    }

    componentWillMount() {
        //Chat Start

        const messagesRef = database.ref('Chats/' + this.props.match.params.id)
            .orderByKey()
            .limitToLast(100);

        messagesRef.on('child_added', snapshot => {
            const message = { msg: snapshot.val().message, name: snapshot.val().name };

            this.setState(prevState => ({
                messages: [...prevState.messages, message],
            }));
        });
        //Chat End
        const obj = getFromStorage('olx');
        if (obj && obj.token) {
            const { token, userId } = obj;
            //Verify token here
            fetch(url + "verify?token=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: token,
                            isLoading: false,
                            //currentUser: userId
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
        // socket.on('chat message', (details) => {
        //     let a = [...this.state.msgArrive, [details.currentUser, details.message]]
        //     console.log(a);
        //     this.setState({ msgArrive: a })
        // });
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
        //let a = [...this.state.msgArrive, [this.state.currentUser, this.state.message]]
        //this.setState({ msgArrive: a })
        const {
            Aduser,
            AduserId,
            currentUser,
            currentUserId,
            message,
            msgArrive
        } = this.state;
        //socket.emit('chat message', details);
        //this.props.dispatch(startSubmitChat(details));

        event.preventDefault();
        console.log(Aduser)
        if (message) {
            const ref = database.ref(`Chats/` + this.props.match.params.id)
            ref.push({ name: currentUser, message });
        }
        this.setState({ message: '' })
    }

    render() {
        const { isLoading, token } = this.state;
        if (isLoading) {
            return (<Loader />);
        }
        if (token) {
            return (
                <div>
                    <Header isAuth={true} />
                    <SecureHeader logout={this.logout} />
                    <h1 style={{ width: '65%', margin: '0 auto' }}>Messages</h1>

                    <hr />
                    <div style={{ width: '80%', margin: '0 auto' }}>
                        <ul style={{ overflow: 'auto' }}>
                            {this.state.messages ? this.state.messages.map((message, index) => this.state.currentUser === message.name ? <div key={index} style={{ padding: '5px' }}>
                                <div style={{ borderRadius: '4px', padding: '10px 0 10px 10px', backgroundColor: '#0084FF', color: 'white' }}>
                                    <span style={{ fontWeight: 'bold' }} >{message.name}</span>
                                    <span style={{ paddingLeft: '10px' }}>{message.msg}</span>
                                </div>
                            </div> : <div key={index} style={{ padding: '5px' }}>
                                    <div style={{ borderRadius: '4px', padding: '10px 0 10px 10px', backgroundColor: '#F1F0F0', color: 'black' }}>
                                        <span style={{ fontWeight: 'bold' }} >{message.name}</span>
                                        <span style={{ paddingLeft: '10px' }}>{message.msg}</span>
                                    </div>
                                </div>) : null}
                        </ul>
                        <div className="input-group mb-3" style={{ width: '80%', margin: '0 auto' }}>
                            <input type="text" className="form-control" value={this.state.message} onChange={this.onChange} placeholder="Type Message..." aria-label="Type Message..." aria-describedby="button-addon2" required />
                            <div className="input-group-append">
                                <button onClick={this.onClick} className="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
                            </div>
                        </div>
                    </div>
                    <br />

                    <hr />
                </div>
            )
        } else {
            return (
                <div>
                    <Redirect to='/signin' />
                </div>
            )
        }

    }
}

export default connect()(Message);