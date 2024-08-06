import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineShopping, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const Cart = () => {
  const cartRef = useRef();
  const { totalQuantities, setshowCart, cartItems, totalPrice, toggleCartItemQuantity, removeCartItem } = useStateContext();

  const handleClick = async () => {
    console.log("Total Price:", totalPrice);
    
    try {
      const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_TOSS_CLIENT_KEY);
      
      if (!tossPayments) {
        console.error("Toss Payments SDK failed to load");
        return;
      }

      // Check if totalPrice is valid
      if (!totalPrice || totalPrice <= 0) {
        console.error("Invalid total price:", totalPrice);
        return;
      }

      await tossPayments.requestPayment("CARD", {
        amount: totalPrice,
        orderId: Math.random().toString(36).slice(2),
        orderName: cartItems.map(item => item.name).join(", "),
        successUrl: `${window.location.origin}/api/payments`,
        failUrl: `${window.location.origin}/api/payments/fail`,
      });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className='cart-container' ref={cartRef}>
      <button
        type='button'
        className='cart-heading'
        onClick={() => setshowCart(false)}>
        <AiOutlineLeft />
        <span className='heading'>Your Cart</span>
        <span className='cart-num-items'>({totalQuantities} items)</span>
      </button>
      {cartItems.length < 1 && (
        <div className='empty-cart'>
          <AiOutlineShopping size={150} />
          <h3>No products in your shopping bag</h3>
          <Link href="/">
            <button
              type='button'
              onClick={() => setshowCart(false)}
              className='btn'>
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
      <div className='product-container'>
        {cartItems.length >= 1 && cartItems.map((item) => (
          <div className='product' key={item._id}>
            <img src={urlFor(item?.image[0])} className='cart-product-image' />
            <div className='item-desc'>
              <div className='flex top'>
                <h5>{item.name}</h5>
                <h5>₩ {item.price}</h5>
              </div>
              <div className='flex bottom'>
                <div>
                  <p className='quantity-desc'>
                    <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                    <span className='num'>{item.quantity}</span>
                    <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                  </p>
                </div>
                <button
                  type='button'
                  className='remove-item'
                  onClick={() => removeCartItem(item._id)}>
                  <TiDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className='hr' />
      
      {cartItems.length >= 1 && (
        <div className='cart-bottom'>
          <hr className='hr' />
          <div className='total'>
            <h3>Order amount : </h3>
            <h3>₩ {totalPrice}</h3>
          </div>
          <div>
            <button
              type='button'
              onClick={handleClick}
              className='btn'>
              Pay Now
            </button>
          </div>
        </div>
      )}
      {/* Additional cart content can be added here */}
    </div>
  );
};

export default Cart;
