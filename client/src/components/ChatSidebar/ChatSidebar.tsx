import { useMediaQuery } from 'react-responsive';

import './chatsidebar.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavbarProfile from '../Navbar/NavbarProfile/NavbarProfile';
import CloseIcon from '@mui/icons-material/Close';
import Member from './Member/Member';

interface iProps {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChatSidebar(props: iProps) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  return (
    <aside
      className={
        props.isOpenSidebar ? 'chat-sidebar chat-sidebar__open' : 'chat-sidebar chat-sidebar__close'
      }
    >
      <section className="chat-sidebar__nav">
        <ArrowBackIosNewIcon className="arrowBack" />
        <p>All channels</p>
        {isTabletOrMobile && (
          <CloseIcon
            className="chat-sidebar__close-icon"
            onClick={() => props.setIsOpenSidebar(false)}
          />
        )}
      </section>
      <section className="chat-sidebar__channel">
        <section className="chat-sidebar__top">
          <h1 className="chat-sidebar__channel-name">front-end developers</h1>
          <h2 className="chat-sidebar__channel-description">
            Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida
            mollis purus, at interdum arcu tempor non
          </h2>
        </section>
        <section className="chat-sidebar__bot">
          <h2 className="chat-sidebar__channel-members-title">Members</h2>
          <section className="chat-sidebar__channel-members">
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
            <Member />
          </section>
        </section>
      </section>
      <section className="chat-sidebar__profile">
        <NavbarProfile page="home" />
      </section>
    </aside>
  );
}

export default ChatSidebar;
