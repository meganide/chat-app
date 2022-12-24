import { useEffect, useRef, useState } from 'react';
import './channel.css';

function Channel() {
  const channelNameRef = useRef<HTMLParagraphElement>(null);
  const [thumbnailName, setThumbnailName] = useState('C');

  useEffect(() => {
    if (channelNameRef) {
      const firstLetters =
        channelNameRef.current?.innerText
          .split(' ')
          .map((word) => word[0])
          .join('') || 'C';

      setThumbnailName(firstLetters);
    }
  }, []);

  return (
    <article className="channel">
      <article className="channel_thumbnail">{thumbnailName}</article>
      <p ref={channelNameRef}>Front-End Developers</p>
    </article>
  );
}

export default Channel;
