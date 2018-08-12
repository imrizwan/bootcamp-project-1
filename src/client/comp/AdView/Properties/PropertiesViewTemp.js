import React from 'react';
import { getFromStorage, setInStorage } from "../../../utils/storage";
const url = `http://localhost:8080/api/`;

export default class PropertiesViewTemp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            ads: '',
        }
    }

    componentWillMount() {
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
        }
    }



    render() {

        const { ads } = this.state;
        if (Array.isArray(ads) && ads) {
            return (
                <div>
                    <div className="card-deck" style={{ width: '80%', margin: '0 auto', padding: '20px 0 20px 0' }}>
                        {ads.map((ad, i) => <div key={i}>{ad.userId}</div>)}
                    </div>
                </div>
            )
        } else return (null);
    }
}