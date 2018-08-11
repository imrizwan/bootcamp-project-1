import React from 'react';
import PropertiesForm from './PropertiesForm';
import './index.css';
const category = 'For Rent';

const ForRent = (props) => (
    <div className="form">
        <PropertiesForm
            category={category}
            onSubmit={(submitData) => {

            }}
        />
    </div>
)

export default ForRent;