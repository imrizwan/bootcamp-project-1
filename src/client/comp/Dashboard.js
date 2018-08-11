import React, { Component } from "react";
import Header from "./Header";
import { Redirect } from 'react-router-dom'
import { getFromStorage, setInStorage } from "../utils/storage";
import Loader from './loader';
import SecureHeader from './secureHeader';

const url = `http://localhost:8080/api/`;

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: '',
            username: '',
            ads: '',
            value: ''
        }
    }

    componentDidMount() {
        const obj = getFromStorage('olx');
        if (obj && obj.userId) {
            const { userId } = obj;
            //Verify token here
            fetch(url + 'dashboard', {
                method: 'POST',
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                },
                body: JSON.stringify({
                  userId: userId
                })
              })
              .then(res => res.json())
              .then(json => {
                  this.setState({
                      ads: json.ads
                  })
              })
        } else {
            this.setState({
                isLoading: false
            });
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

    handleChange = (e) => {
        this.setState({ value: e.target.value })
        switch (e.target.value) {
            case 'properties':
                this.props.history.push('/dashboard/properties');
                break;
            case 'cars':
                this.props.history.push('/dashboard/cars');
                break;
            case 'electronics':
                this.props.history.push('/dashboard/electronics');
                break;
            case 'furniture':
                this.props.history.push('/dashboard/furniture');
                break;
            default:
                console.log("Nothing");
                break;
        }
    }

    render() {

        const { isLoading, token, username, ads } = this.state;

        if (isLoading) {
            return (<Loader />);
        }
        if (token) {
            return (
                <div>
                    <Header isAuth={true} />
                    <SecureHeader logout={this.logout} username={username} />
                <div className="form-group" style={{ width: '80%', margin: '0 auto', padding: '20px 0 20px 0' }}>
                    <select className="form-control form-control-lg" value={this.state.value} onChange={this.handleChange}>
                        <option value="">Select Ad Category...</option>
                        <option value="properties">Properties</option>
                        <option value="cars">Cars</option>
                        <option value="electronics">Electronics &amp; Appliances</option>
                        <option value="furniture">Furniture</option>
                    </select>
                </div>
                </div>
            )
        }

        return (
            <div>
                <Redirect to='/signin' />
            </div>
        );
    }
}
