import React from 'react';
import '../Categories.css';
export default class Properties extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
             value: ""
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
        switch(e.target.value){
            case 'ForRent':
            this.props.history.push('/categories/Properties/ForRent');
                break;
            case 'ForSale':
            this.props.history.push('/categories/Properties/ForSale');
                break;
            case 'NewProjects':
            this.props.history.push('/categories/Properties/NewProjects');
                break;
            default:
            console.log("Nothing");
                break;
        }
    }

    render(){
        return(
            <div className="form-group center">
                <select className="form-control form2" value={this.state.value} onChange={this.handleChange}>
                    <option value="" >Select Ad Type</option>
                    <option value="ForRent">For Rent</option>
                    <option value="ForSale">For Sale</option>
                    <option value="NewProjects">New Projects</option>
                </select>
            </div>
        )
    }
}