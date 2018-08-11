import React from 'react';
import PropertiesForm from './PropertiesForm';
import './index.css';

const category = 'New Projects';

const NewProjects = (props) => (
    <div className="form">
        <PropertiesForm
            category={category}
            onSubmit={(submitData) => {
            }}
        />
    </div>
)

export default NewProjects;