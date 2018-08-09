import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";


export default class Home extends Component {

    render() {

        return (
            <div>
                <Header />
                Home
            </div>
        );
    }
}
