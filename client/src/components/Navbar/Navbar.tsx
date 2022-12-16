import Logo from '../Logo/Logo';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './navbar.css';
import Dropdown from './Dropdown/Dropdown';
import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

export interface iNavbar {
  page: string;
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
  arrowDropdownRef?: React.MutableRefObject<any>;
}

function Navbar(props: iNavbar) {
  const [showDropdown, setShowDropdown] = useState(false);
  const arrowDropdownRef = useRef<any>(null)

  const { userData } = useContext(UserContext);
  

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }


  return (
    <nav className="navbar">
      <Logo />
      <article className="navbar__profile">
        <img className="navbar__profile-pic" src={userData.profilePic || '../public/images/icons/avatar.png'} alt="avatar" />
        <span className="navbar__username">{userData.displayName}</span>
        <ArrowDropDownIcon ref={arrowDropdownRef} className="arrowDropDown" onClick={toggleDropdown} />
      </article>
      {showDropdown && <Dropdown page={props.page} setShowDropdown={setShowDropdown} arrowDropdownRef={arrowDropdownRef}/>}
    </nav>
  );
}

export default Navbar;
