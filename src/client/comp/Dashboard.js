import React, { Component } from "react";
import Header from "./Header";
import { Redirect } from 'react-router-dom'
import { getFromStorage } from "../utils/storage";
import Loader from './loader';
import SecureHeader from './secureHeader';
import { url } from '../Variables';
//import img from "../../../uploads";

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
            redirect: false,
            redirectKey: ""
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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    fetchAdsFromDatabse = (majorCategory, category) => {
        const obj = getFromStorage('olx');
        if (obj && obj.userId) {
            const { userId } = obj;

            var formData = new FormData();
            formData.append('userId', userId);
            formData.append('majorCategory', majorCategory);
            formData.append('category', category);
            //Getting Ads from Database
            fetch(url + 'dashboard', {
                method: 'POST',
                mode: "cors",
                //headers: {
                //    "Content-Type": "application/json",
                //    "Accept": "application/json",
                //},
                body: formData
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        ads: json.ads,
                    })
                    console.log(json);
                })
        }
    }

    showAds = (e) => {

        if (this.state.majorCategory === 'Properties' && this.state.category !== 'all') {
            this.fetchAdsFromDatabse(this.state.majorCategory, this.state.category);
        } else if (this.state.majorCategory === 'showall') {
            this.fetchAdsFromDatabse("showall", null);
        } else if (((this.state.majorCategory === 'Properties' && this.state.category === 'all') || (this.state.majorCategory === 'Properties')) || ((this.state.majorCategory === 'Cars' && this.state.category === 'all') || (this.state.majorCategory === 'Cars'))) {
            if (this.state.majorCategory === 'Properties') {
                this.fetchAdsFromDatabse("Properties", "all");
            } else if (this.state.majorCategory === 'Cars') {
                this.fetchAdsFromDatabse("Cars", "all");
            }
        } else console.log("Kuch to select karle");
    }

    setRedirect = (ad) => {
        this.setState({
            redirect: true,
            redirectKey: ad
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/view/' + this.state.redirectKey._id,
                state: { referrer: this.state.redirectKey }
            }} />
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

                    <h1 style={{ width: '80%', margin: '0 auto', padding: '20px 0 20px 0' }}>Your Ads Will Be Displayed Here, Search By Category</h1>

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
                        {this.state.majorCategory === "Properties" ? <select className="form-control form-control-lg" name="category" value={this.state.category} onChange={this.handleChangeCategory}>
                            <option value="" >Select Ad Type</option>
                            <option value="all">Show All</option>
                            <option value="For Rent">For Rent</option>
                            <option value="For Sale">For Sale</option>
                            <option value="New Projects">New Projects</option>
                        </select> : null}
                        {this.state.majorCategory === "Cars" ? <select className="form-control form-control-lg" name="category" value={this.state.category} onChange={this.handleChangeCategory}>
                            <option value="Cars">Cars</option>
                        </select> : null}
                    </div>
                    <br />
                    <button className="btn btn-outline-success btn-lg btn-block" style={{ width: '80%', margin: '0 auto' }} onClick={this.showAds}>Show My Ads</button>
                    <br />
                    {ads ? ads.map((ad, i) => {
                        console.log(ads);
                        return (<div key={ad._id}><div className="card" style={{ height: '80%', width: '18rem', margin: '0 auto' }}>
                            <img className="card-img-top" src={ad.selectedImage} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{ad.description}</h5>
                                <p className="card-text" style={{ fontSize: '15px' }}>{ad.majorCategory} / {ad.category} / {ad.type}</p>
                                <p className="card-text">{ad.phone}</p>
                                <p className="card-text">{ad.location}</p>
                                {this.renderRedirect()}
                                <button onClick={() => this.setRedirect(ad)} type="button" className="btn btn-outline-primary">See Details</button>
                            </div>
                        </div><br /></div>)
                    }) : null}
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
