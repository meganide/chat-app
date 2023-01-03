import './home.css';
import Chat from '../../components/Chat/Chat';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar';
import { SidebarContextProvider } from '../../contexts/SidebarContext';

function Home() {
  return (
    <SidebarContextProvider>
      <div className="homeContainer">
        <ChatSidebar />
        <Chat />
      </div>
    </SidebarContextProvider>
  );
}

export default Home;
