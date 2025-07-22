// pages/index.jsx
import React from 'react';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Rencontres Next</title>
        <meta name="description" content="Find exciting new connections!" />
      </Head>
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to Rencontres!</h1>
        <p>This is your homepage. Start swiping and meeting new people.</p>
      </main>
    </>
  );
};

export default Home;
