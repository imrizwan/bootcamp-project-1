import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    render(){
        return(
           <div>
               <Link to='/categories'><button className="btn btn-primary btn-lg btn-block">Submit an Ad</button></Link>
           </div>
        )
    }
}