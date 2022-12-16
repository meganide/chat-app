import { useRef, useState } from 'react';
import "./editform.css"

function Editform() {
  // TO DO: update the use state to get from DB/user. Put in a context for global access?
  const [selectedFile, setSelectedFile] = useState('../images/dummypics/cat.png');
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

  return (
    <section className="edit-form profile-form">
      <h1>Change Info</h1>
      <p className="edit-form__subheading">Changes will be reflected to every services</p>
      <section className="edit-form__pic">
        <img className="profile-form__pic" src={selectedFile} alt="avatar" />
        <span className="edit-form__change-photo" onClick={handleOnClick}>
          Change Photo
        </span>
        <input
          type="file"
          name="avatar-file"
          id="avatar-file"
          accept=".jpg, .jpeg, .png, "
          ref={inputFileRef}
          onChange={handleOnChange}
        />
      </section>
      <form className="edit-form__inputs">
        <section className="edit-form__input">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder='Enter your name...' />
        </section>
        <section className="edit-form__input">
          <label htmlFor="name">Bio</label>
          <textarea name="bio" id="bio" rows={3} cols={50} placeholder='Enter your bio...'/>
        </section>
        <section className="edit-form__input">
          <label htmlFor="name">Phone</label>
          <input type="number" name="name" id="name" placeholder='Enter your phone...' />
        </section>
        <section className="edit-form__input">
          <label htmlFor="name">Email</label>
          <input type="email" name="name" id="name" placeholder='Enter your email...' />
        </section>
        <section className="edit-form__input">
          <label htmlFor="name">Password</label>
          <input type="password" name="name" id="name" placeholder='Enter your password...' />
        </section>
        <input className='edit-form__submit' type="submit" value="Save" />
      </form>
    </section>
  );
}

export default Editform;
