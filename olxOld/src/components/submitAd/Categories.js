import React from 'react';
import './Categories.css';

export default class Categories extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
        switch(e.target.value){
            case 'properties':
            this.props.history.push('/categories/Properties');
                break;
            case 'cars':
            this.props.history.push('/categories/Cars');
                break;
            case 'electronics':
            this.props.history.push('/categories/Electronics');
                break;
            case 'furniture':
            this.props.history.push('/categories/Furniture');
                break;
            default:
            console.log("Nothing");
                break;
        }
    }

    render(){
        return(
            <div className="form-group center">
                <br/>
                <select className="form-control form2" value={this.state.value} onChange={this.handleChange}>
                    <option value="">Select Ad Category...</option>
                    <option value="properties">Properties</option>
                    <option value="cars">Cars</option>
                    <option value="electronics">Electronics &amp; Appliances</option>
                    <option value="furniture">Furniture</option>
                </select>
            </div>
        )
    }
}