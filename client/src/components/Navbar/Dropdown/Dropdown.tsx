import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './dropdown.css';
import { iNavbar } from '../NavbarProfile/NavbarProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

function Dropdown(props: iNavbar) {
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        props.arrowDropdownRef?.current &&
        !dropdownRef.current.contains(event.target) &&
        !props.arrowDropdownRef.current.contains(event.target)
      ) {
        props.setShowDropdown && props.setShowDropdown(false);
      }
    }

    if (dropdownRef) {
      window.addEventListener('mousedown', handleClickOutside);

      return () => {
        window.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [dropdownRef, props.arrowDropdownRef]);

  return (
    <aside
      className="dropdown"
      ref={dropdownRef}
      style={props.page === 'home' ? { right: '.625rem', bottom: '4.5rem' } : {}}
    >
      <Link className={props.page === 'profile' ? 'current' : ''} to="/profile">
        {' '}
        <AccountCircleIcon className="dropdown__icon" /> My Profile
      </Link>
      <Link to="/" className={props.page === 'home' ? 'current' : ''}>
        <GroupIcon className="dropdown__icon" /> Group Chat
      </Link>
      <hr className="dropdown__line" />
      <a className="dropdown__logout" href="/api/auth/logout">
        <LogoutIcon className="dropdown__icon" /> Logout
      </a>
    </aside>
  );
}

export default Dropdown;
