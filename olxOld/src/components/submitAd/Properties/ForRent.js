import React from 'react';
import PropertiesForm from './PropertiesForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSubmitAd } from '../../../actions/submitAd';
import './index.css';
const category = 'For Rent';

const ForRent = (props) => (
    <div className="form">
                <Link to="/">
                <button className="btn btn-primary btn-lg btn-block">Back</button>
                <hr/>
                </Link>
                <PropertiesForm 
                category={ category } 
                onSubmit={(submitData)=>{
                    props.dispatch(startSubmitAd(submitData));
                }} 
                />
    </div>
)

export default connect()(ForRent);