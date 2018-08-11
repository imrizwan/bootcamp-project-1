import React from 'react';
import './Categories.css';
import Header from '../Header';
import Loader from '../loader';
import SecureHeader from '../secureHeader';
import { Redirect } from 'react-router-dom';
import { getFromStorage } from "../../utils/storage";


const url = `http://localhost:8080/api/`;

export default class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isLoading: true,
            token: '',
        }
    }

    componentWillMount() {
        const obj = getFromStorage('olx');
        if (obj && obj.token) {
            const { token, username, userId } = obj;
            //Verify token here
            fetch(url + "verify?token=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: token,
                            username: username,
                            userId: userId,
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
                this.props.history.push('/categories/properties');
                break;
            case 'cars':
                this.props.history.push('/categories/cars');
                break;
            case 'electronics':
                this.props.history.push('/categories/electronics');
                break;
            case 'furniture':
                this.props.history.push('/categories/furniture');
                break;
            default:
                console.log("Nothing");
                break;
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
                    <div className="form-group" style={{ width: '80%', margin: '0 auto', padding: '20px 0 20px 0' }}>
                        <select className="form-control form2" value={this.state.value} onChange={this.handleChange}>
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