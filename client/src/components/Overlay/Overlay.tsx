import { ReactNode } from 'react';

import './overlay.css';

interface iProps {
  children?: ReactNode;
}

function Overlay({ children }: iProps) {
  return (
    <>
      <div className="overlay">{children}</div>
    </>
  );
}

export default Overlay;
