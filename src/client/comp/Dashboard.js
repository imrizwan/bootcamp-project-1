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
            value: '',
            majorCategory: '',
            category: '',
            dom: <div></div>
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

    handleChangeCategory = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    value = (e) => {
        return this.state.type;
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });


        if (e.target.value === 'Properties') {
            this.setState({
                dom: <select className="form-control form-control-lg" name="category" value={this.state.category} onChange={this.handleChangeCategory}>
                    <option value="" >Select Ad Type</option>
                    <option value="all">Show All</option>
                    <option value="For Rent">For Rent</option>
                    <option value="For Sale">For Sale</option>
                    <option value="New Projects">New Projects</option>
                </select>
            });
        } else if (e.target.value === 'cars') {
            this.setState({
                dom: <select className="form-control form-control-lg" name="category" value={this.state.category} onChange={this.handleChangeCategory}>
                    <option value="Cars">Cars</option>
                </select>
            });
        }
    }

    fetchAdsFromDatabse = (category) => {
        const obj = getFromStorage('olx');
        if (obj && obj.userId) {
            const { userId } = obj;
            //Getting Ads from Database
            fetch(url + 'dashboard', {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    category: category
                })
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        ads: json.ads,
                    })
                })
        }
    }

    showAds = (e) => {

        if (this.state.majorCategory === 'Properties' && this.state.category === 'For Rent') {
            this.fetchAdsFromDatabse("For Rent");
        } else if (this.state.majorCategory === 'Properties' && this.state.category === 'For Sale') {
            this.fetchAdsFromDatabse("For Sale");
        } else if (this.state.majorCategory === 'Properties' && this.state.category === 'New Projects') {
            this.fetchAdsFromDatabse("New Projects");
        } else if (this.state.majorCategory === 'Properties' && this.state.category === 'all') {
            this.fetchAdsFromDatabse("all");
        } else console.log("Kuch to select karle");
    }

    render() {

        const { isLoading, token, username, dom, ads } = this.state;
        if (isLoading) {
            return (<Loader />);
        }
        if (token) {
            return (
                <div>
                    <Header isAuth={true} />
                    <SecureHeader logout={this.logout} username={username} />
                    <div className="form-group" style={{ width: '80%', margin: '0 auto', padding: '20px 0 20px 0' }}>
                        <select className="form-control form-control-lg" name="majorCategory" value={this.state.majorCategory} onChange={this.handleChange}>
                            <option value="">Select Ad Category...</option>
                            <option value="Properties">Properties</option>
                            <option value="Cars">Cars</option>
                            <option value="Electronics">Electronics &amp; Appliances</option>
                            <option value="Furniture">Furniture</option>
                        </select>
                    </div>
                    <br />
                    <div className="form-group" style={{ width: '80%', margin: '0 auto' }}>
                        {dom}
                    </div>
                    <br />
                    <button className="btn btn-outline-success btn-lg btn-block" style={{ width: '80%', margin: '0 auto' }} onClick={this.showAds}>Show My Ads</button>
                    <br />
                    {ads ? ads.map((ad, i) => <div key={i}><div className="card" style={{ height: '80%', width: '18rem', margin: '0 auto' }}>
                        <img className="card-img-top" src="http://via.placeholder.com/286px180/" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{ad.description}</h5>
                            <p className="card-text" style={{ fontSize: '15px' }}>{ad.majorCategory} / {ad.category} / {ad.type}</p>
                            <p className="card-text">{ad.phone}</p>
                            <p className="card-text">{ad.location}</p>
                            <a href="#" className="btn btn-primary">See Datails</a>
                        </div>
                    </div><br /></div>) : null}
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
