import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './authform.css';
import Logo from '../Logo/Logo';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';

interface Props {
  btnText: string;
  link: string;
  linkText: string;
}

function AuthForm(props: Props) {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const registerPage = location.pathname === '/Register';

  function handleOnChange(e: any) {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (registerPage) {
      registerUser();
    }

    async function registerUser() {
      const res = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      console.log(data);
    }
  }

  return (
    <section className="auth">
      <Logo />
      <p className="auth__slogan">Chat with your best friends from anywhere!</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        {registerPage && (
          <section className="auth__input">
            <BadgeIcon style={{ color: '#828282' }} />
            <input
              type="text"
              name="displayName"
              id="displayName"
              placeholder="Name"
              required
              maxLength={12}
              pattern="[A-Za-z0-9]*"
              onChange={handleOnChange}
            />
          </section>
        )}
        <section className="auth__input">
          <EmailIcon style={{ color: '#828282' }} />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            onChange={handleOnChange}
          />
        </section>
        <section className="auth__input">
          <LockIcon style={{ color: '#828282' }} />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            onChange={handleOnChange}
          />
        </section>
        <input className="auth__submit" type="submit" value={props.btnText} />
        <p className="auth__member">
          {props.linkText}
          <Link className="auth__member-link" to={'/' + props.link}>
            {props.link}
          </Link>
        </p>
      </form>
      <p className="auth__socialtext">OR</p>
      <section className="auth__socials">
        <a href="/api/auth/google">
          <section className="google">
            <img src="images/icons/Google.svg" alt="google" />
            <p>Sign in with Google</p>
          </section>
        </a>
        {/* <img src="images/icons/Facebook.svg" alt="facebook" />
        <img src="images/icons/Twitter.svg" alt="twitter" />
        <img src="images/icons/Github.svg" alt="github" /> */}
      </section>
    </section>
  );
}

export default AuthForm;
