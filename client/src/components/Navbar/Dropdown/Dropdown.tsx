import { Link } from 'react-router-dom';
import './dropdown.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { iNavbar } from '../Navbar';


function Dropdown(props: iNavbar) {
  return (
    <aside className="dropdown">
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
