import "./home.css"
import Chat from '../../components/Chat/Chat';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar';

function Home() {
  return (
    <>
      {/* <Navbar page="home" /> */}
      <div className="homeContainer">
        <ChatSidebar />
        <Chat />
      </div>
    </>
  );
}

export default Home;
