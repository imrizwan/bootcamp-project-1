import React from 'react';
import PropertiesViewTemp from './PropertiesViewTemp';
const category = 'New Projects';

const NewProjects = (props) => (
    <div className="form">
        <PropertiesViewTemp category={category} />
    </div>
)

export default NewProjects;