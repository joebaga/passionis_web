import React from 'react';
import { urlFor } from '@/lib/client';

const HeroBanner = ({ heroBanner, bannerData = [] }) => {
  if (!heroBanner) {
    return null;
  }

  return (
    <div className='mai-container'>
      <div className='full-screen-banner'>
        {bannerData.length > 1 && (
          <>
            <div className='full-screen-left'>
              <img
                src={urlFor(bannerData[0]?.image)}
                alt='Banner Left'
                className='full-screen-banner-image'
                
              />
              
            </div>
            <div className='full-screen-right'>
              <img
                src={urlFor(bannerData[1]?.image)}
                alt='Banner Right'
                className='full-screen-banner-image'
              />
            </div>
          </>
        )}
      </div>

      <div className='hero-banner-container'>
        <div className='hero-banner-content'>
          <p className='beats-solo'>{heroBanner.smallText}</p>
          <h3 className=''>{heroBanner.midText}</h3>
          <h1>{heroBanner.largeText1}</h1>
          <button type='button'>{heroBanner.buttonText}</button>
          <div className='hero-banner-left'>
            <img
              src={urlFor(heroBanner.image)}
              alt='Banner'
              className='hero-banner-image'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
