import React, { Component } from "react";
import "./Header.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from 'react-router-dom'




class Header extends Component {
  

  render() {

    return (
      <div className="root">
      <AppBar position="static">
        <Toolbar>
        <div className="navbar-list">
        <Link to="/"><h2 style={{color: "white"}}>Home</h2></Link>  
          </div>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}

export default Header;
