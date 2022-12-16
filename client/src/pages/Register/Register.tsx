import './register.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import Author from '../../components/Author/Author';

function Register() {
  return (
    <section className="register">
      <div className="wrapper">
        <AuthForm btnText="Register" link="Login"  linkText='Already a member? '/>
        <Author/>
      </div>
    </section>
  );
}

export default Register;
