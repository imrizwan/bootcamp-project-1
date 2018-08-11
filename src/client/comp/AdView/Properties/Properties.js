import React from 'react';

export default class PropertiesView extends React.Component {

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
                this.props.history.push('/dashboard/properties/forrent/');
                break;
            case 'ForSale':
                this.props.history.push('/dashboard/properties/forsale');
                break;
            case 'NewProjects':
                this.props.history.push('/dashboard/properties/newprojects');
                break;
            default:
                console.log("Nothing");
                break;
        }
    }

    render() {
        return (
            <div className="form-group" style={{ width: '80%', margin: '0 auto' }}>
                <select className="form-control form-control-lg" value={this.state.value} onChange={this.handleChange}>
                    <option value="" >Select Ad Type</option>
                    <option value="ForRent">For Rent</option>
                    <option value="ForSale">For Sale</option>
                    <option value="NewProjects">New Projects</option>
                </select>
            </div>
        )
    }
}