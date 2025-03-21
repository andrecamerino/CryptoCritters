// Home.tsx (or whatever your main page component is)
'use client'; // Add this line to make the component a client-side component

import React from 'react';
import Button from '../Button/Button'; // Assuming Button is the component you need
import Island from '../Island/Island';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Home: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <Header />
        <Island />
        <Footer />
    </div>
  );
};

export default Home;