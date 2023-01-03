interface iProps {
  displayName: string;
  profilePic: string;
}


function Member({displayName, profilePic}: iProps) {
  return (
    <article className="chat-sidebar__channel-member">
      <img src={profilePic} alt="" className="chat-sidebar__image" />
      <p className="chat-sidebar__username">{displayName}</p>
    </article>
  );
}

export default Member;
