import React from 'react'
import { Outlet,NavLink } from 'react-router-dom';

function AuthorProfile() {
  return (
    <div>
      <ul className="nav bg-dark justify-content-end p-3 fs-2">
        <li className="nav-item">
              <NavLink className="nav-link text-white" to="">
                Add Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="">
                Articles Of Author
              </NavLink>
            </li>
        </ul>
    </div>
  );
}

export default AuthorProfile