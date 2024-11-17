import React from 'react';
import NavigationBar from '../../components/NavigationBar';

const DefaultLayout = ({ children }) => {

  return (
    <>
      <NavigationBar />

      <main>
        { children }
      </main>

    </>
  );
}

export default DefaultLayout;