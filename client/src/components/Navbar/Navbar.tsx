import Logo from '../Logo/Logo';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './navbar.css';
import Dropdown from './Dropdown/Dropdown';
import React, { useRef, useState } from 'react';

export interface iNavbar {
  page: string;
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
  arrowDropdownRef?: React.MutableRefObject<any>;
}

function Navbar(props: iNavbar) {
  const [showDropdown, setShowDropdown] = useState(false);
  const arrowDropdownRef = useRef<any>(null)

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }


  return (
    <nav className="navbar">
      <Logo />
      <article className="navbar__profile">
        <img className="navbar__profile-pic" src="../images/dummypics/cat.png" alt="" />
        <span className="navbar__username">Renas</span>
        <ArrowDropDownIcon ref={arrowDropdownRef} className="arrowDropDown" onClick={toggleDropdown} />
      </article>
      {showDropdown && <Dropdown page={props.page} setShowDropdown={setShowDropdown} arrowDropdownRef={arrowDropdownRef}/>}
    </nav>
  );
}

export default Navbar;
