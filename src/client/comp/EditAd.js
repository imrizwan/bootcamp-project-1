import React from 'react';
import PropertiesUpdate from './SubmitAd/Properties/PropertiesUpdate';
import Loader from './loader';
import { Redirect } from 'react-router-dom'
import { getFromStorage, setInStorage } from "../utils/storage";
const url = `http://localhost:8080/api/`;

class EditAd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ads: [],
            token: '',
            isLoading: true,
        }

    }

    fetchAdsFromDatabse = (_id) => {
        //Getting Ads from Database
        fetch(url + 'getadbyid', {
            method: 'POST',
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
                    ads: json.ads,
                    isLoading: true
                })
            })
    }

    componentWillMount() {

        if (this.props.match.params.id) {
            fetch(url + 'getadbyid', {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    _id: this.props.match.params.id
                })
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        ads: json.ads,
                    })
                })
        }

        const obj = getFromStorage('olx');
        if (obj && obj.token) {
            const { token } = obj;
            //Verify token here
            fetch(url + "verify?token=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: token,
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
        const { ads, isLoading, token } = this.state;
        console.log(ads);
        if (isLoading) {
            return (<Loader />);
        }
        if (token) {
            return (
                <div>
                    <PropertiesUpdate
                        ads={ads}
                    />
                </div>
            );
        }
        return (
            <div>
                <Redirect to='/signin' />
            </div>
        );
    }
}

export default EditAd;