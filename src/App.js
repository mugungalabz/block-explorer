import React from 'react';
import './App.css';
import EthereumBlockDetail from './components/EthereumBlockDetail';

const App = () => {
  return (
    <div className="App">
      <h1>Bett3r th8n Eth3r5c8n</h1>
      {/* <EthBlockList/> */}
      <EthereumBlockDetail />
    </div>
  );
};

export default App;
