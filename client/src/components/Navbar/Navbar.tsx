import React, { useContext, useRef, useState } from 'react';

import './navbar.css';
import { UserContext } from '../../contexts/UserContext';
import Logo from '../Logo/Logo';
import Dropdown from './Dropdown/Dropdown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface iNavbar {
  page: string;
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
  arrowDropdownRef?: React.MutableRefObject<any>;
}

function Navbar(props: iNavbar) {
  const { userData } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const arrowDropdownRef = useRef<any>(null);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  return (
    <nav className="navbar">
      <Logo />
      <article className="navbar__profile">
        <img
          className="navbar__profile-pic"
          src={userData.profilePic || '../public/images/icons/avatar.png'}
          alt="avatar"
        />
        <span className="navbar__username">{userData.displayName}</span>
        <ArrowDropDownIcon
          ref={arrowDropdownRef}
          className="arrowDropDown"
          onClick={toggleDropdown}
        />
      </article>
      {showDropdown && (
        <Dropdown
          page={props.page}
          setShowDropdown={setShowDropdown}
          arrowDropdownRef={arrowDropdownRef}
        />
      )}
    </nav>
  );
}

export default Navbar;
