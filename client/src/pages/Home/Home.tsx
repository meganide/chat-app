import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
  return (
    <div>
      <Navbar page='home'/>
      <h1>Home</h1>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export default Home;
