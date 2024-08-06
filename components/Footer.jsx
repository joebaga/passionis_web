import React from 'react';
import {AiFillFacebook, AiFillInstagram, AiFillTikTok, AiOutlineShopping} from 'react-icons/ai';


const Footer = () => {
  return (
    <div className='footer-container'>
      <p> 2024 PASSIONIS All rights reserverd</p>

      <p className='icons'>
        <AiFillInstagram/>
        <AiFillFacebook/>
        <AiFillTikTok/>

      </p>
      <div className="contact-info">
        <h2>PASSIONIS</h2>
        <p>1seoul korea </p>
        <p>City, State, ZIP</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: info@business.com</p>
      </div>

    </div>
  )
}

export default Footer