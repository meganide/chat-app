import { useContext } from 'react';
import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import Channel from '../../Channel/Channel';

import Member from '../Member/Member';

function ChatSidebarChannel() {
  const { isShowChannels } = useContext(SidebarContext) as ISidebarContext;

  return (
    <section className="chat-sidebar__channel">
      {!isShowChannels && (
        <section className="chat-sidebar__top">
          <h1 className="chat-sidebar__channel-name">front-end developers</h1>
          <h2 className="chat-sidebar__channel-description">
            Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida
            mollis purus, at interdum arcu tempor non
          </h2>
        </section>
      )}
      <section className="chat-sidebar__bot">
        {!isShowChannels && <h2 className="chat-sidebar__channel-members-title">Members</h2>}
        <section className="chat-sidebar__channel-members">
          {!isShowChannels ? (
            <>
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
            </>
          ) : (
            <>
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            </>
          )}
        </section>
      </section>
    </section>
  );
}

export default ChatSidebarChannel;
