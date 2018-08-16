import React from "react";

const Desc = (props) => {

    return (
        <div>
            <h5 className="card-title">{props.ad.description}</h5>
        </div>
    )
}

export default Desc;