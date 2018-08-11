import React from 'react';
import './PropertiesForm.css';

class PropertiesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            majorCategory: "Properties",
            category: this.props.category,
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
            file: null
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handlePictures = (Files) => {
        this.setState({ file: Files[0] });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let submitData = {
        }

        this.props.onSubmit(submitData);
        // startSubmitAd(submitData);
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid Signup">
                <div className="container">
                    <h1 className="display-4">Submit Ad</h1>
                    <form onSubmit={this.onSubmit} className="form">
                        <div className="form-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="photos" accept="image/x-png,image/gif,image/jpeg,image/jpg" multiple onChange={(e) => this.handlePictures(e.target.files)} required />
                                <label className="custom-file-label" htmlFor="photos">Add Photos</label>
                            </div>
                            <hr />
                            <div className="alert alert-primary" role="alert">
                                Properties / {this.props.category}
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
                            <button className="btn btn-outline-success btn-lg btn-block">Submit Ad</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default PropertiesForm;