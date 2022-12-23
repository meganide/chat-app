import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './editform.css';

interface iValues {
  profilePic?: any;
  displayName: string;
  bio: string;
}

function Editform() {
  // TO DO: update the use state to get from DB/user. Put in a context for global access?
  const { userData, httpIsAuthenticated } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(
    userData.profilePic || '../public/images/icons/avatar.png'
  );
  const [error, setError] = useState(false);
  const inputFileRef = useRef<any>(null);

  function handleOnClick() {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  function handleOnChange(e: any) {
    const imgURL = URL.createObjectURL(e.target?.files[0]);
    setSelectedFile(imgURL);
  }

  async function saveProfile(e: any) {
    e.preventDefault();

    const { profilePic, displayName, bio } = e.target;

    let editedValues: iValues = {
      // avatarFile: avatarFile.files[0], //TODO: Add new profile pic, need to store somewhere
      displayName: displayName.value,
      bio: bio.value,
    };

    console.log({ editedValues });

    const response = await httpEditProfile(editedValues);
    console.log(response);

    if (response?.resp?.ok) {
      httpIsAuthenticated(); //update profile
    }

    if (response?.data?.error) {
      setError(response?.data?.error);
    }
  }

  async function httpEditProfile(values: iValues) {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };
      const resp = await fetch('/api/user/profile/' + userData?.userId, requestOptions);
      const data = await resp.json();
      return { resp, data };
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="edit-form profile-form">
      <h1>Change Info</h1>
      <p className="edit-form__subheading">Changes will be reflected to every services</p>
      <form className="edit-form__inputs" onSubmit={saveProfile}>
        <section className="edit-form__pic">
          <img className="profile-form__pic" src={selectedFile} alt="avatar" />
          <span className="edit-form__change-photo" onClick={handleOnClick}>
            Change Photo
          </span>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            accept=".jpg, .jpeg, .png, "
            ref={inputFileRef}
            onChange={handleOnChange}
          />
        </section>
        <section className="edit-form__input">
          <label htmlFor="displayName">Display Name</label>
          <input type="text" name="displayName" id="displayName" placeholder="Enter your name..." />
        </section>
        <section className="edit-form__input">
          <label htmlFor="bio">Bio</label>
          <textarea name="bio" id="bio" rows={3} cols={50} placeholder="Enter your bio..." />
        </section>
        <section className="edit-form__input">
          <label htmlFor="phone">Phone</label>
          <input type="number" name="phone" id="phone" placeholder="Enter your phone..." />
        </section>
        <section className="edit-form__input">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Enter your email..." />
        </section>
        <section className="edit-form__input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password..."
          />
        </section>
        {error && <p className='edit-form__error'>{error}</p>}
        <input className="edit-form__submit" type="submit" value="Save" />
      </form>
    </section>
  );
}

export default Editform;
