import { Link } from 'react-router-dom';

function Logo() {
  return (
    <>
      <Link to="/">
        <section className="auth__logo">
          <img src="../images/icons/icons8-chat-room-48.png" alt="" />
          <span className="auth__name">Chatify</span>
        </section>
      </Link>
    </>
  );
}

export default Logo;
