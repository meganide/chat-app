import './profile.css';
import Author from '../../components/Author/Author';
import Navbar from '../../components/Navbar/Navbar';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

function Profile() {
  return (
    <section className="profile">
      <Navbar page="profile" />
      <div className="wrapper">
        <h1 className="profile__heading">Personal info</h1>
        <p className="profile__subheading">Basic info, like your name and photo</p>
        <ProfileForm />
        <Author />
      </div>
    </section>
  );
}

export default Profile;
