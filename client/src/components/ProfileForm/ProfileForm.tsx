import './profileform.css';
import ProfileRow from './ProfileRow/ProfileRow';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

function ProfileForm() {
  const { userData } = useContext(UserContext);

  const rowInfo = {
    photo: userData.profilePic || '../public/images/icons/avatar.png',
    name: userData.displayName,
    bio: userData.bio || 'No bio assigned...',
    phone: '+123123123',
    email: userData.email,
    password: '***********',
  };

  return (
    <section className="profile-form">
      <article className="profile-form__intro profile-form__padding">
        <article className="profile-form__heading">
          <h2>Profile</h2>
          <p>Some info may be visible to other people</p>
        </article>
        <Link to="/profile/edit" className="profile-form__edit">
          Edit
        </Link>
      </article>
      {Object.entries(rowInfo).map(([key, value]) => {
        return <ProfileRow key={uuidv4()} keys={key} value={value} />;
      })}
    </section>
  );
}

export default ProfileForm;
