import { useState } from 'react';

import Usertooltip from '../../UserTooltip/Usertooltip';
import './message.css';

function Message(props: any) {
  const [showUsertooltip, setShowUserTooltip] = useState(false);

  return (
    <article className="message">
      <img src={props.img} alt="" />
      <article className="message__user-info">
        <article className="message__top">
          <div className="message_username-container">
            <p className="message_username" onClick={() => setShowUserTooltip(true)}>
              {props.displayName}
            </p>
          {showUsertooltip && <Usertooltip displayName={props.displayName} setShowUserTooltip={setShowUserTooltip} />}
          </div>
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
