import './register.css';
import AuthForm from '../../components/AuthForm/AuthForm';

function Register() {
  return (
    <section className="register">
      <div className="wrapper">
        <AuthForm btnText="Register" link="Login"  linkText='Already a member? '/>
        <section className="register__author-links">
        <p className="register__created-by">Created by <span>Renas H</span></p>
        <a className="register__author-link" href='https://renas.se/'>renas.se</a>

        </section>
      </div>
    </section>
  );
}

export default Register;
