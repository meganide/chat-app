import AuthForm from '../../components/AuthForm/AuthForm';

function Login() {
  return (
    <section className="register">
      <div className="wrapper">
        <AuthForm btnText="Login" link="Register" linkText="Don't have an account yet? " />
        <section className="register__author-links">
          <p className="register__created-by">
            Created by <span>Renas H</span>
          </p>
          <a className="register__author-link" href="https://renas.se/">
            renas.se
          </a>
        </section>
      </div>
    </section>
  );
}

export default Login;
