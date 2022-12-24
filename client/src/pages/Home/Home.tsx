import { useState } from "react";

import "./home.css"
import Chat from '../../components/Chat/Chat';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar';

function Home() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <>
      {/* <Navbar page="home" /> */}
      <div className="homeContainer">
        <ChatSidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
        <Chat setIsOpenSidebar={setIsOpenSidebar} isOpenSidebar={isOpenSidebar}/>
      </div>
    </>
  );
}

export default Home;
