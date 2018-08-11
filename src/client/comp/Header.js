import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand">OLX</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            {this.props.isAuth ? (
                                <li className='nav-item'>
                                    <Link to='/dashboard' className='nav-link'>Account</Link>
                                </li>
                            ) : (
                                    <li className="nav-item dropdown">
                                        <Link to='/signup' className='nav-link dropdown-toggle' id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Join OLX</Link>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link to='/signin' className='dropdown-item'>Sign In</Link>
                                            <Link to='/signup' className='dropdown-item'>Sign Up</Link>
                                        </div>
                                    </li>
                                )}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Help &amp; Contact Us
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Saftey Tips</a>
                                    <a className="dropdown-item" href="#">Happy OLXers</a>
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;