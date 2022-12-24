import './message.css';

function Message() {
  return (
    <article className="message">
      <img src="./images/icons/avatar.png" alt="" />
      <article className="message__user-info">
        <article className="message__top">
          <p className="message_username">Renas Hassan</p>
          <p className="message__date">yesterday at 2:29 AM</p>
        </article>
        <article className="message__bot">
          <p>
            Hejsan, vad händer jao???! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Autem porro voluptate sit tempore. Repellat alias voluptatem inventore repellendus sed
            quis nobis iure dolor, similique quam asperiores velit, sequi itaque ipsam.
          </p>
        </article>
      </article>
    </article>
  );
}

export default Message;
