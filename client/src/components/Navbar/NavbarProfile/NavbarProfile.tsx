import React, { useContext, useRef, useState } from 'react';

import { IUserContext, UserContext } from '../../../contexts/UserContext';
import Dropdown from '../Dropdown/Dropdown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface iNavbar {
  page: string;
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
  arrowDropdownRef?: React.MutableRefObject<any>;
}

function NavbarProfile(props: iNavbar) {
  const { userData } = useContext(UserContext) as IUserContext;

  const arrowDropdownRef = useRef<any>(null);

  const [showDropdown, setShowDropdown] = useState(false);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  return (
    <>
      <article
        className="navbar__profile"
        style={props.page === 'home' ? { justifyContent: 'space-between', width: '100%' } : {}}
      >
        <img
          className="navbar__profile-pic"
          src={userData.profilePic || '../public/images/icons/avatar.png'}
          alt="avatar"
        />
        <span
          className="navbar__username"
          style={
            props.page === 'home'
              ? { color: '#828282', marginRight: 'auto', marginLeft: '1rem' }
              : {}
          }
        >
          {userData.displayName}
        </span>
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
    </>
  );
}

export default NavbarProfile;
