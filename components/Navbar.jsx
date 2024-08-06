'use client';

import Link from 'next/link';
import contact from '@/components/contact';
import { AiOutlineShopping, AiOutlineMenu } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { Cart } from './';
import { useStateContext } from '@/context/StateContext';
import { urlFor, client } from '@/lib/client';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const { showCart, setshowCart, totalQuantities } = useStateContext();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = async () => {
    if (!showDropdown) {
      try {
        const productQuery = '*[_type == "product"]';
        const fetchedProducts = await client.fetch(productQuery);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='navbar-container'>
      <div className='logo'>
        <Link href='/' legacyBehavior>
          <a href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" class="font-montserrat">
            PASSIONIS
          </a>
        </Link>
      </div>
      <div className={`navbar-container-item ${menuOpen ? 'show' : ''}`}>
        <a onClick={toggleDropdown}>BAGS</a>
        <a onClick={toggleDropdown}>ACCESSORIES</a>
        <Link href='/contact' legacyBehavior><a>CONTACT</a></Link>
        <Link href='/' legacyBehavior><a>ABOUT PASSIONIS</a></Link>
      </div>
      <button type='button' className='cart-icon' onClick={() => setshowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
      <div className='menu-icon' onClick={toggleMenu}>
        <AiOutlineMenu />
      </div>
      {showDropdown && (
        <div className='dropdown'>
          {products.map((product) => (
            <Link key={product._id} href={`/product/${product.slug.current}`}>
              <div className='dropdown-item'>
                <img src={urlFor(product.image && product.image[0])} alt={product.name} />
                <p>{product.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
