import React from 'react';
import 'boxicons/css/boxicons.min.css';
import './App.css';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Header from './components/Header';
import Cookie from './components/Cookie';
import HomeCards from './components/HomeCards';
import ScrollTop from './components/ScrollTop';
import Pricing from './components/Pricing';

function App() {

  return (
    <>
      <div >
        <Header/>
      </div>
      <div id="site-content">
      <Cookie/>

      <div class="card text-center" style={{ backgroundColor: 'ivory' }}>
        <div class="card-header fs-3">
          Scroll Down ⬇️
        </div>
      </div>

      <ScrollTop/>

      <HomeCards/>
      <Pricing/>
      <ChatBot/>
      </div>
      <Footer />
    </>
  );
}

export default App;
