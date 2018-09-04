import React from "react";
import { getFromStorage } from "../utils/storage";
import Header from "./Header";
import SecureHeader from './secureHeader';
import Loader from './loader';
import './Message.css';
import { url } from '../Variables';
import { Redirect, Link } from 'react-router-dom'
import { database } from '../firebase/firebase';

class AllMessages extends React.Component {

    constructor(props) {
        super(props)
        const obj = getFromStorage('olx');
        this.state = {
            isLoading: true,
            token: '',
            currentUser: obj ? obj.username : '',
            currentUserId: obj ? obj.userId : '',
            chats: [],
            values: ''
        }
    }

    componentWillMount() {
        const messagesRef = database.ref(`Chats`).once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.key.includes(this.state.currentUserId)) {


                    childSnapshot.forEach((cSS) => {
                        this.setState({
                            values: cSS.val()
                        })
                    })

                    this.setState({
                        chats: [...this.state.chats, { values: this.state.values, url: childSnapshot.key }]
                    })



                    //Keys
                    // database.ref(`Chats/` + childSnapshot.key).once('value').then((ss) => {
                    //     ss.forEach((cSS) => {
                    //         this.setState({
                    //             chats: [...this.state.chats, { url: childSnapshot.key, name: cSS.val().name, message: cSS.val().message }]
                    //         });
                    //     });
                    //     console.log(this.state.chats)
                    // }).catch((e) => {
                    //     console.log(e);
                    // });
                    //Keys
                }
            });
        }).catch((e) => {
            console.log(e);
        });

        //const messagesRef = database.ref(`Chats/` + this.state.currentUserId)
        //  .orderByKey()
        //   .limitToLast(100);

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
                        setInStorage('olx', { token: "", 'username': "", 'userId': "" })
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
            return (<Loader />);
        }
        if (token) {
            return (
                <div>
                    <Header isAuth={true} />
                    <SecureHeader logout={this.logout} />
                    {this.state.chats !== [] ? this.state.chats.map((chat, index) => (
                        <div key={index}>
                            <br />
                            <div className="jumbotron jumbotron-fluid" style={{ paddingLeft: '10px', paddingTop: '15px', paddingBottom: '5px', margin: '0 auto', width: '90%', borderRadius: '4px', border: '2px solid black' }}>
                                <Link to={"/message/" + chat.url}><h6>{chat.values.name}</h6></Link>
                                <p>{chat.values.message}</p>
                            </div>
                        </div>
                    )) : console.log("Error")}
                    <br />
                    <Link to="/">Go to Home</Link>
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

export default AllMessages;