import { useEffect, useRef, useState } from 'react';
import './channel.css';


function Channel({name}: any) {
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
      <p ref={channelNameRef}>{name}</p>
    </article>
  );
}

export default Channel;
