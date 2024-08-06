// components/Layout.jsx
import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import '../app/globals.css';  // Adjusted import path

export const metadata = {
  title: 'PASSIONIS',
  description: 'Description of your app',
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>PASSIONIS</title>
        <meta name="description" content="Description of your app" />
      </Head>
      <body>
        <div className='layout'>
          <header>
            <Navbar />
          </header>
          <main className='main-container'>
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}

export default Layout;

