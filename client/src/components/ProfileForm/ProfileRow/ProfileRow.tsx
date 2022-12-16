import './profilerow.css';

interface Props {
  keys: string;
  value: string;
}

function ProfileRow(props: Props) {
  return (
    <article
      className="profile-form__row profile-form__padding"
      style={props.keys === 'password' ? { borderBottom: 0 } : {}}
    >
      <p className="profile-form__key">{props.keys}</p>
      {props.keys === 'photo' ? (
        <img className="profile-form__pic" src={props.value} alt="avatar" />
      ) : (
        <p className="profile-form__value">{props.value}</p>
      )}
    </article>
  );
}

export default ProfileRow;
