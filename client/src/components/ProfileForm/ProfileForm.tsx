import './profileform.css';
import ProfileRow from './ProfileRow/ProfileRow';
import { v4 as uuidv4 } from 'uuid';

function ProfileForm() {
  const rowInfo = {
    photo: 'images/dummypics/cat.png',
    name: 'Renas Hassan',
    bio: 'I am a fullstack web developer',
    phone: '+46123123',
    email: 'test@gmail.com',
    password: '***********',
  };
  return (
    <section className="profile-form">
      <article className="profile-form__intro profile-form__padding">
        <article className="profile-form__heading">
          <h2>Profile</h2>
          <p>Some info may be visible to other people</p>
        </article>
        <button className="profile-form__edit">Edit</button>
      </article>
      {Object.entries(rowInfo).map(([key, value]) => {
        return <ProfileRow key={uuidv4()} keys={key} value={value} />;
      })}
    </section>
  );
} 

export default ProfileForm;
