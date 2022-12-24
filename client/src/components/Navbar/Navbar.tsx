import './navbar.css';
import Logo from '../Logo/Logo';
import NavbarProfile from './NavbarProfile/NavbarProfile';

function Navbar(props: { page: string }) {
  return (
    <nav className="navbar">
      <Logo />
      <NavbarProfile page={props.page} />
    </nav>
  );
}

export default Navbar;
