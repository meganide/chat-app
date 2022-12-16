import AuthForm from '../../components/AuthForm/AuthForm';
import Author from '../../components/Author/Author';

function Login() {
  return (
    <section className="register">
      <div className="wrapper">
        <AuthForm btnText="Login" link="Register" linkText="Don't have an account yet? " />
          <Author />
      </div>
    </section>
  );
}

export default Login;
