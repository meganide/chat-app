import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserContext, UserContext } from '../../contexts/UserContext';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './editform.css';

interface iValues {
  profilePic?: any;
  displayName: string;
  bio: string;
}

function Editform() {
  const { userData, httpIsAuthenticated } = useContext(UserContext) as IUserContext;;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(
    userData.profilePic || '../public/images/icons/avatar.png'
  );
  const [uploadFile, setUploadFile] = useState<string | ArrayBuffer | null>('');
  const inputFileRef = useRef<any>(null);
  const navigate = useNavigate();

  function handleOnClickChooseImage() {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  function handleFileInputChange(e: any) {
    const imgURL = URL.createObjectURL(e.target?.files[0]);
    setSelectedFile(imgURL);

    const reader = new FileReader();
    reader.readAsDataURL(e.target?.files[0]);
    reader.onloadend = () => {
      setUploadFile(reader.result);
    };
  }

  async function handleSubmitSaveProfile(e: any) {
    e.preventDefault();
    setLoading(true);

    let profilePic: undefined | string = undefined;

    if (uploadFile) {
      const imageUploadResponse = await httpUploadImage(uploadFile);
      profilePic = imageUploadResponse?.url;
    }

    const { displayName, bio } = e.target;

    let editedValues: iValues = {
      profilePic,
      displayName: displayName.value,
      bio: bio.value,
    };

    const response = await httpEditProfile(editedValues);

    if (response?.resp?.ok) {
      httpIsAuthenticated(); //update profile
      navigate('/profile');
    } else if (response?.data?.error) {
      setError(response?.data?.error);
    }

    setLoading(false);
  }

  async function httpUploadImage(base64EncodedImage: string | ArrayBuffer) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: base64EncodedImage }),
      };
      const resp = await fetch('/api/user/profile/upload/' + userData?.userId, requestOptions);
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error(err);
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
      <form className="edit-form__inputs" onSubmit={handleSubmitSaveProfile}>
        <fieldset className="edit-form__fieldset" disabled={loading}>
          <section className="edit-form__pic">
            <img className="profile-form__pic" src={selectedFile} alt="avatar" />
            <span className="edit-form__change-photo" onClick={handleOnClickChooseImage}>
              Change Photo
            </span>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              accept=".jpg, .jpeg, .png, "
              ref={inputFileRef}
              onChange={handleFileInputChange}
            />
          </section>
          <section className="edit-form__input">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              placeholder="Enter your name..."
              maxLength={12}
              pattern="[A-Za-z0-9]*"
            />
          </section>
          <section className="edit-form__input">
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              rows={3}
              cols={50}
              placeholder="Enter your bio..."
              maxLength={300}
            />
          </section>
          {/* <section className="edit-form__input">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Enter your email..." />
        </section> */}
          {/* <section className="edit-form__input">
          <label htmlFor="password">Password</label>
          <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password..."
          />
        </section> */}
          {error && <p className="edit-form__error">{error}</p>}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <input className="edit-form__submit" type="submit" value="Save" />
          )}
        </fieldset>
      </form>
    </section>
  );
}

export default Editform;
