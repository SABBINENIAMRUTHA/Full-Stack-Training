// import React from 'react'
// import './Header.css'
// import { NavLink } from 'react-router-dom'

// function Header() {
//   return (
//     <div className='bg-dark p-3 text-center text-white'>
//     <ul className="nav justify-content-center fs-3">
//      <li className="nav-item">
//       <NavLink className="nav-link tect-white" to="">
//         Home
//       </NavLink>
//      </li>
//      <li className="nav-item">
//       <NavLink className="nav-link tect-white" to="signup">
//         Sign-Up
//       </NavLink>
//      </li>
//      <li className="nav-item">
//       <NavLink className="nav-link tect-white" to="signin">
//         Sign-In
//       </NavLink>
//      </li>
//      <li className="nav-item">
//       <NavLink className="nav-link tect-white" to="about">
//         About
//       </NavLink>
//      </li>
//     </ul>
    
//     </div>

//   )
// }

// export default Header


import "./Header.css";

import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="bg-dark p-3 text-center text-white">
      <ul className="nav justify-content-end fs-3">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="signup">
            Signup
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="signin">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="about">
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;