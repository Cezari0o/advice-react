import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import SlipMessage from 'components/SlipMessage';
import Button from 'components/Button';
import api from 'services/api';
import SpinLoader from 'components/SpinLoader';
import Table from 'components/Table';

export interface SlipObject {
  id: number;
  advice: string;
}

interface Message {
  type: 'noticed' | 'warning' | 'error';
  text: string;
}

function App() {
  const [loading, isLoading] = useState(false);
  const [loadingSlips, isLoadingSlips] = useState(false);
  const [darkMode, isDarkMode] = useState(true);
  const [mainSlipObj, setSlipObj] = useState<SlipObject | undefined>(undefined);
  const [slipList, setSlipList] = useState<SlipObject[]>([]);
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const [msgResponse, haveMsgResponse] = useState(false);

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

  async function fetchSlips(slipIds: number[]) {
    const retrievedSlips: SlipObject[] = [];

    for (const id of slipIds) {
      try {
        const response = await api.get(`/${id}`);
        const someSlip: SlipObject = response.data.slip;

        retrievedSlips.push(someSlip);
      } catch (e) {
        console.log('Error retrieving stored slips');
        console.log(e);
      }
    }

    return retrievedSlips;
  }

  useEffect(() => {
    // Load Slips
    const slipIds = localStorage.getItem('slipList');

    try {
      // Testing localStorage availability
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
    } catch (e) {
      console.log("Nope, can't access localStorage");
    }

    if (slipIds) {
      isLoadingSlips(true);
      fetchSlips(JSON.parse(slipIds)).then((slips) => {
        setSlipList(slips);
        isLoadingSlips(false);
      });
    }
  }, []);

  useEffect(() => {
    // Save Slips
    if (slipList.length > 0) {
      const slipListIds: number[] = [];

      slipList.forEach((slip) => {
        slipListIds.push(slip.id);
      });
      const slipListData = JSON.stringify(slipListIds);

      try {
        localStorage.setItem('slipList', slipListData);
      } catch (error) {
        console.log('Not possible to store the advices!');
      }
    }
  }, [slipList]);

  const table_data = useMemo(() => slipList, [slipList]);

  function memorizeSlip(slip: SlipObject) {
    const newList = Object.assign([], slipList);

    const listMaxSize = 20;
    const newSize = newList.unshift(slip);

    if (newSize > listMaxSize) {
      newList.pop();
    }

    setSlipList(newList);
  }

  return (
    <div className={`App h-screen w-full overflow-auto bg-gray-100 dark:bg-slate-800 dark:text-gray-300`}>
      <div className='container'>
        <header className='pt-8'>
          <h1 className='text-3xl'>Your Daily Advice</h1>
        </header>

        {mainSlipObj ? (
          <SlipMessage text={mainSlipObj.advice} />
        ) : (
          <SpinLoader className='flex py-10 place-content-center' />
        )}

        <div className='justify-self-center justify-center space-x-2 container flex row-auto mb-10'>
          <Button
            text='More Advice'
            isLoading={loading}
            onClick={() => {
              memorizeSlip(mainSlipObj as SlipObject);
              fetchSlip();
              // console.log(slipList);
            }}
          />
          <Button
            text={`${!darkMode ? 'Enable' : 'Disable'} Dark Mode`}
            onClick={() => {
              isDarkMode(!darkMode);
              console.log(`dark mode ${darkMode ? 'enabled' : 'disabled'}`);
            }}
          />
        </div>

        <div className='inline w-full columns-1 xl:columns-2 '>
          {loadingSlips ? (
            <SpinLoader className='flex py-10 place-content-center' />
          ) : (
            table_data.length > 0 && (
              //
              <Table data={table_data} />
              //
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
