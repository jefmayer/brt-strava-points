import { Head, Html, Main, NextScript } from 'next/document';

import Footer from '../components/footer';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white flex flex-col min-h-screen text-neutral-800">
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
