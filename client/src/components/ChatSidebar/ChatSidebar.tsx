import './chatsidebar.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavbarProfile from '../Navbar/NavbarProfile/NavbarProfile';
import Member from './Member/Member';

function ChatSidebar() {
  return (
    <aside className="chat-sidebar">
      <section className="chat-sidebar__nav">
        <ArrowBackIosNewIcon className="arrowBack" />
        <p>All channels</p>
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
