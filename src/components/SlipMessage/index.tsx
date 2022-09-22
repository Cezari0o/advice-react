import React from 'react';

interface SlipMessageProps {
  text: string;
}

function SlipMessage({text}: SlipMessageProps) {
  return (
    <div className='mx-auto lg:max-w-[70%] my-9 md:max-w-md sm:max-w-xs'>
      <span className='text-xl'>&rdquo;{text}&rdquo;</span>
    </div>
  );
}

export default SlipMessage;
