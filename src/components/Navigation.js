import React from 'react';
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/Home">Home</NavLink>
          <NavLink to="/About">About</NavLink>
          <NavLink to="/Blog">Blog</NavLink>
          <NavLink to="/Signup">Sign Up</NavLink>
          <NavLink to="/Login">Login</NavLink>
       </div>
    );
}
 
export default Navigation;
