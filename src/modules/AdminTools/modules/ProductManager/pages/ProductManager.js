import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { useEffect } from 'react';

import {
  requestProductImageFileSizeAsync,
  requestProductsAsync,
} from '@/modules/AdminTools/redux/productManager/products';
import { requestCategoriesAsync } from '@/modules/AdminTools/redux/productManager/product-categories';
import { requestSubCategoriesAsync } from '@/modules/AdminTools/redux/productManager/products-sub-categories';

const ProductManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestProductsAsync.request());
    dispatch(requestCategoriesAsync.request());
    dispatch(requestSubCategoriesAsync.request());
    dispatch(requestProductImageFileSizeAsync.request());
  }, [dispatch]);

  return (
    <div className="m-6">
      <Outlet />
    </div>
  );
};

export default ProductManager;
