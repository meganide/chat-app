import './message.css';

function Message(props: any) {
  return (
    <article className="message">
      <img src={props.img} alt="" />
      <article className="message__user-info">
        <article className="message__top">
          <p className="message_username">{props.displayName}</p>
          <p className="message__date">{props.date}</p>
        </article>
        <article className="message__bot">
          <p>{props.message}</p>
        </article>
      </article>
    </article>
  );
}

export default Message;
