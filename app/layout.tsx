// app/layout.tsx

import React from "react";
import '../app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StateContext } from "@/context/StateContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StateContext>
          <div className='layout'>
            <header>
              <Navbar />
            </header>
            <hr className='hr' />
            <main className='mai-container'>
              
              {children}
              
            </main>
            <hr className='hr' />
            <footer>
              <Footer />
            </footer>
          </div>
        </StateContext>
      </body>
    </html>
  );
}
