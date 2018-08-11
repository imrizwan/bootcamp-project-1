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
                  console.log(json.ads)
              })
        }
    }



    render() {

        const { ads } = this.state;

        return (
           <div>
               <div className="card-deck" style={{ width: '80%', margin: '0 auto', padding: '20px 0 20px 0' }}>
               <div className="card">
                    <img className="card-img-top" src="http://via.placeholder.com/239x180" alt="Card image cap"/>
                    <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
               <div className="card">
                    <img className="card-img-top" src="http://via.placeholder.com/239x180" alt="Card image cap"/>
                    <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
               <div className="card">
                    <img className="card-img-top" src="http://via.placeholder.com/239x180" alt="Card image cap"/>
                    <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}