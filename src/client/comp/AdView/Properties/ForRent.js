import React from 'react';
import PropertiesViewTemp from './PropertiesViewTemp';
const category = 'For Rent';

const ForRent = (props) => (
    <div className="form">
        <PropertiesViewTemp category={category} />
    </div>
)

export default ForRent;