import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '@/components';
import { StateContext, useStateContext } from '../../context/StateContext';

interface ProductType {
  _id: string;
  image: string[];
  name: string;
  detail: string;
  price: number;
  slug: { current: string };
  quantity: number; 
  [key: string]: any;
  
}

interface ProductDetailsProps {
  product: ProductType;
  products: ProductType[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, products }) => {
  const { image, name, detail, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, Qty, onAdd } = useStateContext();

  if (!product || !products) {
    console.error('Product or products not found or are null');
    return <div>Loading...</div>;
  }

  console.log('Product:', product);
  console.log('Products:', products);

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[index]).url()} alt={name} className='product-detail-image' />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item).url()}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                alt={`${name} thumbnail ${i}`}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1 className='intro'>{name}</h1>
          <p className='price'>₩ {price}</p>
          <div className='reviews'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>
          
          <h4> Details: </h4>
          <p>{detail}</p>
          
          <div className='quantity'>
            <h3>quantity: </h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
              <span className='num'>{Qty}</span>
              <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, Qty)}>Add to Cart</button>
            <button type='button' className='buy-now'>Buy Now</button>
          </div>
        </div>
      </div>
      <hr className='hr' />
      <div className='maylike-products-wrapper'>
        <h2>you may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{ slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map((product: ProductType) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: false, // Change to 'true' if you want incremental static regeneration
  };
};

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
