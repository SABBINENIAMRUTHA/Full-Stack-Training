// import React from 'react'
// import {NavLink} from 'react-router-dom'
// function Header() {
//   return (
//     <div>
//     <ul className='nav bg-dark justify-content-end p-3 fs-2'>
//     <li className='nav-item'>
//         <NavLink className="nav-link text-light"to="Home">
//             Home
//         </NavLink>
//     </li>
//     <li className='nav-item'>
//         <NavLink className="nav-link text-light"to="Signin">
//             Signin
//         </NavLink>
//     </li>
//     <li className='nav-item'>
//         <NavLink className="nav-link text-light"to="Signup">
//             Signup
//         </NavLink>
//     </li>
//     <li className='nav-item'>
//         <NavLink className="nav-link text-light"to="About">
//             About
//         </NavLink>
//     </li>

//     </ul>
//     </div>
//   )
// }

// export default Header






import "./Header.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../../contexts/LoginContextProvider";

function Header() {
  const { currentUserDetails, setCurrentUserDetails } =
    useContext(loginContext);

  function userLogout() {
    sessionStorage.removeItem("token");
    setCurrentUserDetails({
      userLoginStatus: false,
      currentUser: {},
      err: "",
    });
  }

  return (
    <div>
      <ul className="nav bg-dark justify-content-end p-3 fs-2">
        {currentUserDetails.userLoginStatus !== true ? (
          <span>
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
          </span>
        ) : (
          <li className="nav-item">
            <NavLink
              className="nav-link text-white"
              to="signin"
              onClick={userLogout}
            >
              <span className="me-4">
                Welcome,{currentUserDetails.currentUser.username}
              </span>
              Signout
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;