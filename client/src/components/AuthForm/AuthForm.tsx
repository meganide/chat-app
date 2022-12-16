import { Link } from 'react-router-dom';
import './authform.css';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Logo from '../Logo/Logo';

interface Props {
  btnText: string;
  link: string;
  linkText: string;
}

function AuthForm(props: Props) {
  
  return (
    <section className="auth">
      <Logo />
      <p className="auth__slogan">Chat with your best friends from anywhere!</p>
      <form className="auth__form" action="/auth" method="post">
        <div className="auth__input">
          <EmailIcon style={{ color: '#828282' }} />
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div className="auth__input">
          <LockIcon style={{ color: '#828282' }} />
          <input type="password" name="password" id="password" placeholder="Password" />
        </div>
        <input className="auth__submit" type="submit" value={props.btnText} />
      </form>
      <p className="auth__socialtext">or continue with these social profile</p>
      <section className="auth__socials">
        <a href="/api/auth/google">
          <img src="images/icons/Google.svg" alt="google" />
        </a>
        <img src="images/icons/Facebook.svg" alt="facebook" />
        <img src="images/icons/Twitter.svg" alt="twitter" />
        <img src="images/icons/Github.svg" alt="github" />
      </section>
      <p className="auth__member">
        {props.linkText}
        <Link className="auth__member-link" to={'/' + props.link}>
          {props.link}
        </Link>
      </p>
    </section>
  );
}

export default AuthForm;