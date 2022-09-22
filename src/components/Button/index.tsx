import SpinLoader from 'components/SpinLoader';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  destiny?: string;
}

function Button({text, isLoading, destiny, ...rest}: ButtonProps) {
  return (
    <button className='justify-center' {...rest} type='button'>
      <div className='rounded-md shadow flex w-full items-center justify-center border border-transparent bg-blue-400 px-8 py-3 text-base font-medium text-white hover:bg-blue-500 md:py-4 md:px-10 md:text-lg'>
        {isLoading ? (
          <SpinLoader />
        ) : (
          <a className='' href={destiny}>
            {text}
          </a>
        )}
      </div>
    </button>
  );
}

export default Button;
