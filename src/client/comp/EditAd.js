import React from 'react';
import PropertiesForm from './SubmitAd/Properties/PropertiesForm';
import Loader from './loader';
import { Redirect } from 'react-router-dom'
import { getFromStorage } from "../utils/storage";
import { url } from '../Variables';

class EditAd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ad: this.props.location.state.referrer,
            token: '',
            isLoading: true,
        }

    }

    componentWillMount() {

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
        const { ad, isLoading, token } = this.state;
        if (isLoading) {
            return (<Loader />);
        }
        if (token) {
            return (
                <div>
                    <PropertiesForm
                        ad={ad}
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