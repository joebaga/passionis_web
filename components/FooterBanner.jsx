import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/lib/client';

const FooterBanner = ({ footerBanner }) => {
  // Providing default values to avoid TypeError
  const {
    discount ,
    largeText1,
    largeText2 ,
    saleTime ,
    desc,
    buttonText,
    product, // Assuming product contains the slug of the product
    image,
  } = footerBanner || {};

  // Check if image is defined before using it
  const imageUrl = image ? urlFor(image).url() : '';

  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{desc}</p>
          {/* Check if product is defined before using it */}
          {product && (
            <Link href={`/product/${product}`}>
              <button type='button'>{buttonText}</button>
            </Link>
          )}
        </div>
        {/* Render image if imageUrl is defined 
        {imageUrl && <img src={imageUrl} alt="" className='footer-banner-image' 
         width={250}
         height={250}
        />} */}
      </div>
    </div>
  );
};

export default FooterBanner;
