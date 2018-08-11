import React from 'react';
import './loader/csspin.css';
import './loader.css';

export default () => (
    <div>
        <div style={{ height: '200px', width: '200px' }} id="loadingDiv" className="cp-spinner cp-morph"></div>
    </div>
);