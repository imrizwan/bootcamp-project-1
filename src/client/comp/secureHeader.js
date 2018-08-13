import React from 'react';
import { Link } from 'react-router-dom';

class SecureHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { username } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: '10px' }}>
                    <div className="form-inline my-2 my-lg-0">
                        <button className="btn btn-outline-danger my-2 my-sm-0" style={{ marginRight: '20px' }} onClick={this.props.logout}>Log Out</button>
                        <Link className="btn btn-outline-success my-2 my-sm-0" style={{ marginRight: '20px' }} to="/categories" >Submit and Ad</Link>
                    </div>
                    {username ? (
                        <div className="form-inline my-2 my-lg-2 my-md-2">
                            <div style={{ color: 'white' }} className="lead">Welcome {username} </div>
                        </div>
                    ) : (null)}
                </nav>
            </div>
        )
    }
}

export default SecureHeader;