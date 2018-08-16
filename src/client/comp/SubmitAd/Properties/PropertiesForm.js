import React from 'react';
import './PropertiesForm.css';
import { getFromStorage } from "../../../utils/storage";

const url = `http://localhost:8080/api/`;

class PropertiesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.ad ? this.props.ad.userId : '',
            majorCategory: "Properties",
            category: this.props.ad ? this.props.ad.category : this.props.category,
            type: this.props.ad ? this.props.ad.type : "",
            description: this.props.ad ? this.props.ad.description : "",
            price: this.props.ad ? this.props.ad.price : "",
            bedrooms: this.props.ad ? this.props.ad.bedrooms : "",
            bathrooms: this.props.ad ? this.props.ad.bathrooms : "",
            furnishing: this.props.ad ? this.props.ad.furnishing : "",
            constructionstatus: this.props.category ? "" : this.props.ad.category === "New Projects" ? this.props.ad.constructionstatus : "",
            listedby: this.props.ad ? this.props.ad.listedby : "",
            SBArea: this.props.ad ? this.props.ad.SBArea : "",
            carpetArea: this.props.ad ? this.props.ad.carpetArea : "",
            bachelorsallowed: this.props.ad ? this.props.ad.bachelorsallowed : "",
            maintenance: this.props.ad ? this.props.ad.maintenance : "",
            totalFloors: this.props.ad ? this.props.ad.totalFloors : "",
            floorNumber: this.props.ad ? this.props.ad.floorNumber : "",
            carparking: this.props.ad ? this.props.ad.carparking : "",
            facing: this.props.ad ? this.props.ad.facing : "",
            projectname: this.props.ad ? this.props.ad.projectname : "",
            location: this.props.ad ? this.props.ad.location : "",
            name: this.props.ad ? this.props.ad.name : "",
            phone: this.props.ad ? this.props.ad.phone : "",
            file: [],
            edit: false
        }
    }


    componentDidMount() {

        if (this.props.ad) {
            this.setState({
                edit: true
            })
        }

        const obj = getFromStorage('olx');
        if (obj) {
            const { userId } = obj;
            this.setState({ userId });
        }
    }

    fileSelectedHandler = (e) => {
        console.log(e.target.files[0])
        this.setState({
            file: e.target.files[0]
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    onClick = () => {
        const {
            userId, majorCategory, category, type, description, price, bedrooms, bathrooms, furnishing, constructionstatus, listedby, SBArea, carpetArea, bachelorsallowed, maintenance, totalFloors, floorNumber, carparking, facing, projectname, location, name, phone, file
        } = this.state;
        // post request

        fetch(url + 'propertyform', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                majorCategory: majorCategory,
                category: category,
                type: type,
                description: description,
                price: price,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                furnishing: furnishing,
                constructionstatus: constructionstatus,
                listedby: listedby,
                SBArea: SBArea,
                carpetArea: carpetArea,
                bachelorsallowed: bachelorsallowed,
                maintenance: maintenance,
                totalFloors: totalFloors,
                floorNumber: floorNumber,
                carparking: carparking,
                facing: facing,
                projectname: projectname,
                location: location,
                name: name,
                phone: phone,
                file: file
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        formError: json.message,
                        type: "",
                        description: "",
                        price: "",
                        bedrooms: "",
                        bathrooms: "",
                        furnishing: "",
                        constructionstatus: "",
                        listedby: "",
                        SBArea: "",
                        carpetArea: "",
                        bachelorsallowed: "",
                        maintenance: "",
                        totalFloors: "",
                        floorNumber: "",
                        carparking: "",
                        facing: "",
                        projectname: "",
                        location: "",
                        name: "",
                        phone: "",
                    })
                } else {
                    this.setState({
                        formError: json.message,
                    })
                }
            })
    };

    edit = () => {
        console.log("Edit");
    }

    render() {
        const { formError, edit } = this.state;

        return (
            <div className="jumbotron jumbotron-fluid Signup">
                <div className="container">
                    {
                        (formError) ? (
                            <div className="alert alert-danger" role="alert">
                                {formError}
                            </div>
                        ) : (null)
                    }
                    {
                        (edit) ? (
                            <h1 className="display-4">Update Ad</h1>
                        ) : <h1 className="display-4">Submit Ad</h1>
                    }
                    <div className="form-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="photos" onChange={this.fileSelectedHandler} accept="image/x-png,image/gif,image/jpeg,image/jpg" multiple required />
                            <label className="custom-file-label" htmlFor="photos">Add Photos</label>
                        </div>
                        <hr />
                        <div className="alert alert-primary" role="alert">
                            Properties / {this.state.category}
                        </div>
                        <hr />
                        <div className="form-group">
                            <select className="form-control" value={this.state.type} onChange={this.handleChange} name="type" required>
                                <option value="" disabled>Select Property Type...</option>
                                <option>Apartments</option>
                                <option>Houses &amp; Villas</option>
                                <option>Builder Floors</option>
                                <option>PG &amp; Roommates</option>
                                <option>Shops &amp; Offices</option>
                                <option>Land &amp; Plots</option>
                                <option>Guest Houses</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} required></textarea>
                        </div>
                        <div className="form-group">
                            <input placeholder="Price (Rs)" className="form-control" name="price" type="number" value={this.state.price} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="bedrooms">Bedrooms</label> */}
                            <select className="form-control" value={this.state.bedrooms} onChange={this.handleChange} name="bedrooms" required>
                                <option value="" className="optionColor" disabled>Bedrooms...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="4+">4+</option>
                            </select>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="bathrooms">Bathrooms</label> */}
                            <select className="form-control" value={this.state.bathrooms} onChange={this.handleChange} name="bathrooms" required>
                                <option value="" className="optionColor" disabled>Bathrooms...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="4+">4+</option>
                            </select>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="furnishing">Furnishing</label> */}
                            <select className="form-control" value={this.state.furnishing} onChange={this.handleChange} name="furnishing" required>
                                <option value="" className="optionColor" disabled>Furnishing...</option>
                                <option value="Furnished">Furnished</option>
                                <option value="UnFurnished">UnFurnished</option>
                                <option value="Semi-Furnished">Semi-Furnished</option>
                            </select>
                        </div>
                        {
                            this.props.category === "New Projects" ? <div className="form-group"><select className="form-control" value={this.state.constructionstatus} onChange={this.handleChange} name="constructionstatus" required><option value="">Construction Status...</option><option>Under Construction</option><option>Ready to Move</option><option>New Launch</option></select></div> : ""
                        }
                        <div className="form-group">
                            {/* <label htmlFor="listedby">Listed By</label> */}
                            <select className="form-control" value={this.state.listedby} onChange={this.handleChange} name="listedby" required>
                                <option value="" className="optionColor" disabled>Listed By...</option>
                                <option value="Owner">Owner</option>
                                <option value="Dealer">Dealer</option>
                                <option value="Builder">Builder</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Super Builtup Area (ft)" type="number" value={this.state.SBArea} onChange={this.handleChange} name="SBArea" required />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Carpet Area (ft)" type="number" value={this.state.carpetArea} onChange={this.handleChange} name="carpetArea" required />
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="bachelorsallowed">Bachelors Allowed</label> */}
                            <select className="form-control" value={this.state.bachelorsallowed} onChange={this.handleChange} name="bachelorsallowed" required>
                                <option value="" className="optionColor" disabled>Bachelors Allowed...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Maintenance Monthly (Rs)" type="number" value={this.state.maintenance} onChange={this.handleChange} name="maintenance" required />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Total Floors" type="number" value={this.state.totalFloors} onChange={this.handleChange} name="totalFloors" required />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Floor Number" type="number" value={this.state.floorNumber} onChange={this.handleChange} name="floorNumber" required />
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="carparking">Car Parking</label> */}
                            <select className="form-control" value={this.state.carparking} onChange={this.handleChange} name="carparking" required>
                                <option value="" className="optionColor" disabled>Car Parking...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="3+">3+</option>
                            </select>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="facing">Facing</label> */}
                            <select className="form-control" onChange={this.handleChange} name="facing" value={this.state.facing} required>
                                <option value="" className="optionColor" disabled>Facing...</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="North-East">North-East</option>
                                <option value="North-West">North-West</option>
                                <option value="South-East">South-East</option>
                                <option value="South-West">South-West</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Project Name" type="text" value={this.state.projectname} onChange={this.handleChange} name="projectname" required />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Location" type="text" value={this.state.location} onChange={this.handleChange} name="location" required />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Name" type="text" value={this.state.name} onChange={this.handleChange} name="name" required />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Phone (+923451234567)" type="number" value={this.state.phone} onChange={this.handleChange} name="phone" required />
                        </div>
                        {edit ? <button className="btn btn-outline-success btn-lg btn-block" onClick={this.edit}>Update Ad</button> :
                            <button className="btn btn-outline-success btn-lg btn-block" onClick={this.onClick}>Submit Ad</button>}
                    </div>
                    {
                        (formError) ? (
                            <div className="alert alert-danger" role="alert">
                                {formError}
                                {alert(formError)}
                            </div>
                        ) : (null)
                    }
                </div>
            </div>
        )
    }
}

export default PropertiesForm;