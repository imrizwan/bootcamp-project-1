import React from 'react';
import '../Categories.css';

export default class Properties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
        switch (e.target.value) {
            case 'ForRent':
                this.props.history.push('/categories/properties/forrent/');
                break;
            case 'ForSale':
                this.props.history.push('/categories/properties/forsale');
                break;
            case 'NewProjects':
                this.props.history.push('/categories/properties/newprojects');
                break;
            default:
                console.log("Nothing");
                break;
        }
    }

    render() {
        return (
            <div className="form-group" style={{ width: '80%', margin: '0 auto' }} >
                <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                    <option value="" >Select Ad Type</option>
                    <option value="ForRent">For Rent</option>
                    <option value="ForSale">For Sale</option>
                    <option value="NewProjects">New Projects</option>
                </select>
            </div>
        )
    }
}