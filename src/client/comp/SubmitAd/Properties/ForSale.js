import React from 'react';
import PropertiesForm from './PropertiesForm';
import './index.css';

const category = 'For Sale';

const ForSale = (props) => (
    <div className="form">
        <PropertiesForm
            category={category}
            onSubmit={(submitData) => {
            }}
        />
    </div>
)

export default ForSale;