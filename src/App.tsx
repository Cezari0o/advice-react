import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SlipMessage from 'components/SlipMessage';
import Button from 'components/Button';

function App() {
  const [loading, isLoading] = useState(false);
  const [darkMode, isDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`App h-screen w-full bg-gray-100 dark:bg-slate-800`}>
      <div className='container'>
        <header className='pt-8'>
          <h1 className='text-3xl dark:text-gray-300'>Your Daily Advice</h1>
        </header>

        <SlipMessage text='O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo. Mesmo não atingindo o alvo, quem busca e vence obstáculos, no mínimo fará coisas admiráveis' />

        <div className='justify-self-center justify-center space-x-2 container flex row-auto'>
          <Button text='More Advice' isLoading={loading} onClick={() => isLoading(!loading)} />
          <Button
            text='Enable Dark Mode'
            onClick={() => {
              isDarkMode(!darkMode);
              console.log(`dark mode ${darkMode ? 'enabled' : 'disabled'}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
