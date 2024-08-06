'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar, FooterBanner, HeroBanner, Product } from '../components';
import { client } from '../lib/client';
import '../app/globals.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data
        const productQuery = '*[_type == "product"]';
        const fetchedProducts = await client.fetch(productQuery);

        // Fetch banner data
        const bannerQuery = '*[_type == "banner"]';
        const fetchedBanners = await client.fetch(bannerQuery);

        // Log fetched data
        console.log('Fetched Products:', fetchedProducts);
        console.log('Fetched Banners:', fetchedBanners);

        // Set state with fetched data
        setProducts(fetchedProducts);
        setBannerData(fetchedBanners);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render HeroBanner component with bannerData */}
      <HeroBanner heroBanner={bannerData.length > 0 ? bannerData[0] : null} bannerData={bannerData} />
      
      <div className="products-heading">
        <h2>Best sellers</h2>
        <p>Many more to see</p>
        <div className="products-container">
          {products.map((product) => (
            <Link key={product._id} href={`/product/${product.slug.current}`}>
              <Product product={product} />  {/* Render the Product component */}
            </Link>
          ))}
        </div>
      </div>
      
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export default Home;
