import { Link } from 'react-router-dom';
import './dropdown.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { iNavbar } from '../Navbar';
import { useEffect, useRef } from 'react';

function Dropdown(props: iNavbar) {
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        props.setShowDropdown && props.setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <aside className="dropdown" ref={dropdownRef}>
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
