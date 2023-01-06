import './home.css';
import Chat from '../../components/Chat/Chat';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar';
import { SidebarContextProvider } from '../../contexts/SidebarContext';
import { ChannelContextProvider } from '../../contexts/ChannelContext';

function Home() {
  return (
    <ChannelContextProvider>
      <SidebarContextProvider>
        <div className="homeContainer">
          <ChatSidebar />
          <Chat />
        </div>
      </SidebarContextProvider>
    </ChannelContextProvider>
  );
}

export default Home;
