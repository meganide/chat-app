import Logo from '../Logo/Logo';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './navbar.css';
import Dropdown from './Dropdown/Dropdown';
import { useState } from 'react';

export interface iNavbar {
  page: string;
}

function Navbar(props: iNavbar) {
  const [showDropdown, setShowDropdown] = useState(false);

  function toggleDropdown() {
    setShowDropdown(!showDropdown)
  }

  return (
    <nav className="navbar">
      <Logo />
      <article className="navbar__profile">
        <img className="navbar__profile-pic" src="images/dummypics/cat.png" alt="" />
        <span className="navbar__username">Renas</span>
        <ArrowDropDownIcon className="arrowDropDown" onClick={toggleDropdown} />
      </article>
        {showDropdown && <Dropdown page={props.page}/>}
    </nav>
  );
}

export default Navbar;
