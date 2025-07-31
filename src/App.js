import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BuilderCanvas from './components/BuilderCanvas';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Sidebar />
        <BuilderCanvas />
      </div>
      <Footer />
    </div>
  );
}

export default App;
