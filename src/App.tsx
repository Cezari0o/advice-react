import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SlipMessage from 'components/SlipMessage';
import Button from 'components/Button';
import api from 'services/api';
import SpinLoader from 'components/SpinLoader';

interface SlipObject {
  slip_id: number;
  advice: string;
}

function App() {
  const [loading, isLoading] = useState(false);
  const [darkMode, isDarkMode] = useState(true);
  const [mainSlipObj, setSlipObj] = useState<SlipObject | undefined>(undefined);

  async function fetchSlip() {
    isLoading(true);

    try {
      const response = await api.get(``, {
        params: {
          t: new Date().getTime(),
        },
      });
      const newSlip: SlipObject = response.data.slip;
      setSlipObj(newSlip);
      isLoading(false);
    } catch (error) {
      console.log('Slip fetch failed');
      console.log(error);
      isLoading(false);
    }
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    fetchSlip();
  }, []);

  return (
    <div className={`App h-screen w-full bg-gray-100 dark:bg-slate-800`}>
      <div className='container'>
        <header className='pt-8'>
          <h1 className='text-3xl dark:text-gray-300'>Your Daily Advice</h1>
        </header>

        {mainSlipObj ? (
          <SlipMessage text={mainSlipObj.advice} />
        ) : (
          <SpinLoader className='flex py-10 place-content-center' />
        )}

        <div className='justify-self-center justify-center space-x-2 container flex row-auto'>
          <Button text='More Advice' isLoading={loading} onClick={() => fetchSlip()} />
          <Button
            text={`${!darkMode ? 'Enable' : 'Disable'} Dark Mode`}
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
