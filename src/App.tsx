import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SlipMessage from 'components/SlipMessage';
import Button from 'components/Button';

function App() {
  const [loading, isLoading] = useState(false);

  return (
    <div className='App'>
      <div className='container my-10'>
        <header className=''>
          <h1 className='text-3xl'>Your Daily Advice</h1>
        </header>

        <SlipMessage text='O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo. Mesmo não atingindo o alvo, quem busca e vence obstáculos, no mínimo fará coisas admiráveis' />

        <Button destiny='#' text='More Advice' isLoading={loading} onClick={() => isLoading(!loading)} />
      </div>
    </div>
  );
}

export default App;
