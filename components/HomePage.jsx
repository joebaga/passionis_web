import React from 'react';
import Link from 'next/link';
import { Navbar,FooterBanner, HeroBanner, Product } from '../components'; 
import { client } from '../lib/client';
import '../app/globals.css'; 
import { urlFor } from '@/lib/client';

const HomePage = ({ heroBanner }) => {
  if (!heroBanner) {
    return null;
  }

  return (
    <div className="side-by-side-images">
      {bannerData.length > 1 && (
        <>
          <img src={urlFor(image && image[0])} />
          <img src={urlFor(image && image[0])} />
        </>
      )}
  </div>
  );
};

export default HomePage