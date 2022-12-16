import Logo from "../Logo/Logo"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./navbar.css"

function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <article className="navbar__profile">
        <img className="navbar__profile-pic" src="images/dummypics/cat.png" alt="" />
        <span className="navbar__username" >Renas</span>
        <ArrowDropDownIcon className="arrowDropDown" />
      </article>
    </nav>
  )
}

export default Navbar