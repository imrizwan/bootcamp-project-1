import React from 'react';

class SignUp extends React.Component {
    render(){
        return(
            <div className="container">
                <div className="jumbotron">
                <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-3">Sign Up</h1>
                    <br/>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Email</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Password</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default SignUp;