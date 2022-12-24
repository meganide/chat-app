import { Link } from 'react-router-dom';

import './editprofile.css';
import Author from '../../components/Author/Author';
import Editform from '../../components/EditForm/Editform';
import Navbar from '../../components/Navbar/Navbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function EditProfile() {
  return (
    <section className="edit-profile">
      <Navbar page="profile" />
      <div className="wrapper">
        <Link className="edit-profile__back" to="/profile">
          <ArrowBackIosNewIcon style={{ fontSize: '1rem' }} /> Back
        </Link>
        <Editform />
        <Author />
      </div>
    </section>
  );
}

export default EditProfile;
