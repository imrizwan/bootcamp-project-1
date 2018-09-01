import React from "react";
import Header from "../../Header";
import { Redirect } from 'react-router-dom'
import { getFromStorage, setInStorage } from "../../../utils/storage";
import Loader from '../../loader';
import { url } from '../../../Variables';
import SecureHeader from '../../secureHeader';
// var socket = require('socket.io-client')('http://localhost:8080');
// socket.on('connect', function () {
//     console.log("Client Connected");
// });

class PropertiesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: '',
            success: '',
            currentUser: '',
            redirectKey: '',
            redirect: ''
        }
    }

    componentWillMount() {
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
                            currentUser: userId
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

    delete = (_id) => {
        //Getting Ads from Database
        fetch(url + 'delete', {
            method: 'DELETE',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                _id: _id
            })
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    success: json.success
                })
            })
        this.props.history.push('/dashboard');
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

    setRedirect = (ad) => {
        this.setState({
            redirect: true,
            redirectKey: ad
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/edit/' + this.state.redirectKey._id,
                state: { referrer: this.state.redirectKey }
            }} />
        }
    }

    message = () => {
        //renderRedirect
        if (this.state.redirect) {
            setInStorage('ad', this.state.redirectKey);
            //socket.emit('ad', this.state.redirectKey);
            console.log(this.state.redirectKey)
            return <Redirect to={{
                pathname: '/message/' + this.state.currentUser + this.state.redirectKey.userId,
                state: { referrer: this.state.redirectKey }
            }} />
        }

    }


    render() {
        //if (this.props.location.state && this.props.location.state.referrer) {
        const {
            _id,
            userId,
            majorCategory,
            category,
            type,
            description,
            price,
            bedrooms,
            bathrooms,
            furnishing,
            constructionstatus,
            listedby,
            SBArea,
            carpetArea,
            bachelorsallowed,
            maintenance,
            totalFloors,
            floorNumber,
            carparking,
            facing,
            projectname,
            location,
            name,
            phone,
            selectedImage
        } = this.props.location.state.referrer;

        const ad = this.props.location.state.referrer;
        const {
            currentUser
        } = this.state;
        //}
        const { isLoading, token } = this.state;
        if (isLoading) {
            return (<Loader />);
        }
        if (token) {
            return (
                <div>
                    <Header isAuth={true} />
                    <SecureHeader logout={this.logout} />
                    <div style={{ margin: '20px 0 20px 0' }}>
                        <div className="jumbotron jumbotron-fluid" style={{ borderRadius: '8px', width: '80%', margin: '0 auto' }} >
                            <div className="container">
                                <img className="card-img-top" src={selectedImage} style={{ margin: '0 auto' }} alt="Card image cap" />
                                <br />
                                <h1 className="display-6">{majorCategory} / {category} / {type}</h1>
                                <h1 className="lead">Description: {description}</h1>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            <span style={{ textDecoration: '900' }}>Price:</span> {price}
                                        </div>
                                        <div className="col-sm">
                                            Bedroom: {bedrooms}
                                        </div>
                                        <div className="col-sm">
                                            Bathrooms: {bathrooms}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            Furnishing: {furnishing}
                                        </div>
                                        <div className="col-sm">
                                            Listed By: {listedby}
                                        </div>
                                        <div className="col-sm">
                                            Super Bed Area: {SBArea}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            Carpet Area: {carpetArea}
                                        </div>
                                        <div className="col-sm">
                                            Bachelors Allowed: {bachelorsallowed}
                                        </div>
                                        <div className="col-sm">
                                            Maintenance: {maintenance}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            Total Floors: {totalFloors}
                                        </div>
                                        <div className="col-sm">
                                            Floor Number: {floorNumber}
                                        </div>
                                        <div className="col-sm">
                                            Car Parking: {carparking}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            Facing: {facing}
                                        </div>
                                        <div className="col-sm">
                                            Project Name: {projectname}
                                        </div>
                                        <div className="col-sm">
                                            Location: {location}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            Name: {name}
                                        </div>
                                        <div className="col-sm">
                                            Phone: {phone}
                                        </div>
                                        {category === "New Projects" ?
                                            <div className="col-sm">
                                                Construction Status: {constructionstatus}
                                            </div> : <div className="col-sm"></div>
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            {currentUser === userId ? <div> {this.renderRedirect()} <button onClick={() => this.setRedirect(ad)} className="btn btn-outline-success btn-lg" style={{ textAlign: 'center', float: 'left' }} >Edit this Ad</button></div> :
                                                <div> {this.message()} <button onClick={() => this.setRedirect(ad)} className="btn btn-outline-primary btn-lg" style={{ textAlign: 'center', float: 'left' }} >Message</button></div>
                                            }
                                        </div>
                                        <div className="col-sm">
                                        </div>
                                        <div className="col-sm">
                                            {currentUser === userId ? <button className="btn btn-outline-danger btn-lg" data-toggle="modal" data-target="#exampleModalCenter" style={{ textAlign: 'center', float: 'right' }} >Delete this Ad</button> : null}
                                            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalCenterTitle">Delete Ad</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            Are You Sure You Want to Delete this Ad?
                                                         </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => this.delete(_id)} data-dismiss="modal">Yes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            )
        }
        return (
            <div>
                <Header isAuth={false} />
                <div style={{ margin: '20px 0 20px 0' }}>
                    <div className="jumbotron jumbotron-fluid" style={{ borderRadius: '8px', width: '80%', margin: '0 auto' }} >
                        <div className="container">
                            <img className="card-img-top" src={selectedImage} style={{ margin: '0 auto' }} alt="Card image cap" />
                            <br />
                            <h1 className="display-6">{majorCategory} / {category} / {type}</h1>
                            <h1 className="lead">Description: {description}</h1>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        <span style={{ textDecoration: '900' }}>Price:</span> {price}
                                    </div>
                                    <div className="col-sm">
                                        Bedroom: {bedrooms}
                                    </div>
                                    <div className="col-sm">
                                        Bathrooms: {bathrooms}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        Furnishing: {furnishing}
                                    </div>
                                    <div className="col-sm">
                                        Listed By: {listedby}
                                    </div>
                                    <div className="col-sm">
                                        Super Bed Area: {SBArea}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        Carpet Area: {carpetArea}
                                    </div>
                                    <div className="col-sm">
                                        Bachelors Allowed: {bachelorsallowed}
                                    </div>
                                    <div className="col-sm">
                                        Maintenance: {maintenance}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        Total Floors: {totalFloors}
                                    </div>
                                    <div className="col-sm">
                                        Floor Number: {floorNumber}
                                    </div>
                                    <div className="col-sm">
                                        Car Parking: {carparking}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        Facing: {facing}
                                    </div>
                                    <div className="col-sm">
                                        Project Name: {projectname}
                                    </div>
                                    <div className="col-sm">
                                        Location: {location}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        Name: {name}
                                    </div>
                                    <div className="col-sm">
                                        Phone: {phone}
                                    </div>
                                    {category === "New Projects" ?
                                        <div className="col-sm">
                                            Construction Status: {constructionstatus}
                                        </div> : <div className="col-sm"></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        )
    }
}

export default PropertiesView;