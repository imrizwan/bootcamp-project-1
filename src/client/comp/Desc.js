import React from "react";
import { Link } from 'react-router-dom'

const Desc = (props) => {

    return (
        <div>
            <Link to={"edit/" + props.ad._id}><h5 className="card-title">{props.ad.description}</h5></Link>
        </div>
    )
}

export default Desc;