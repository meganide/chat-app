import Member from '../Member/Member';

function ChatSidebarChannel() {
  return (
    <section className="chat-sidebar__channel">
      <section className="chat-sidebar__top">
        <h1 className="chat-sidebar__channel-name">front-end developers</h1>
        <h2 className="chat-sidebar__channel-description">
          Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis
          purus, at interdum arcu tempor non
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
  );
}

export default ChatSidebarChannel;
