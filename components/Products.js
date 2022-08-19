// import db from '../utils/db';
// import Product from '../models/Product';
// import mongoose from 'mongoose';

import React, { useContext } from 'react';
import ProductItem from '../components/ProductItem';
import axios from 'axios';

import db from '../utils/db';
import Product from '../models/Product';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';

const Products = ({ products }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  console.log('first', products);
  return (
    <div>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;

export async function getServerSideProps() {
  await db.connect();

  const products = await Product.find({}).lean();
  // const featuredProductsDocs = await Product.find(
  //   { isFeatured: true },
  //   '-reviews'
  // )
  //   .lean()
  //   .limit(3);
  // const topRatedProductsDocs = await Product.find({}, '-reviews')
  //   .lean()
  //   .sort({
  //     rating: -1,
  //   })
  //   .limit(6);
  await db.disconnect();
  return {
    props: {
      // featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      // topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
