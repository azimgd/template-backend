import s3uploaderRouter from 'react-s3-uploader/s3router';
import { Router } from 'express';
import { version } from '../../package.json';

import pages from './pages';
import pageValidator from '../validators/pageValidator';

import products from './products';
import productValidator from '../validators/productValidator';

import pageCategories from './pageCategories';
import pageCategoryValidator from '../validators/pageCategoryValidator';
import pageSubCategories from './pageSubCategories';
import pageSubCategoryValidator from '../validators/pageSubCategoryValidator';

import base from './indexBase';
import users from './users';
import userValidator from '../validators/userValidator';
import productCategories from './productCategories';
import productCategoryValidator from '../validators/productCategoryValidator';
import productSubCategories from './productSubCategories';
import productSubCategoryValidator from '../validators/productSubCategoryValidator';
import productOptions from './productOptions';
import productOptionValidator from '../validators/productOptionValidator';
import productFeatures from './productFeatures';
import productFeatureValidator from '../validators/productFeatureValidator';
import productImages from './productImages';
import productImageValidator from '../validators/productImageValidator';

const s3routerConfig = {
  bucket: 'shoptemplate',
  region: 'eu-west-1',
  signatureVersion: 'v4',
  headers: { 'Access-Control-Allow-Origin': '*' },
};

export const routerEndpoints = {
  USERS: {
    root: '/users',
    login: '/users/login',
    logout: '/users/logout',
  },
  PAGES: {
    root: '/pages',
  },
  PRODUCTS: {
    root: '/products',
  },
  PRODUCT_IMAGES: {
    root: '/productImages',
  },
  PAGE_CATEGORIES: {
    root: '/pageCategories',
  },
  PAGE_SUB_CATEGORIES: {
    root: '/pageSubCategories',
  },
  PRODUCT_CATEGORIES: {
    root: '/productCategories',
  },
  PRODUCT_SUB_CATEGORIES: {
    root: '/productSubCategories',
  },
  PRODUCT_OPTIONS: {
    root: '/productOptions',
    distinct: '/productOptions/distinct',
  },
  PRODUCT_FEATURES: {
    root: '/productFeatures',
    distinct: '/productFeatures/distinct',
  },
  S3: {
    root: '/pages',
  },
};

export default ({ models }) => {
  const api = Router();

  const UsersController = users({ models, base, userValidator });
  api.get(routerEndpoints.USERS.login,
    UsersController.routes.login,
    UsersController.routes.loginOnSuccess,
  );
  api.get(routerEndpoints.USERS.logout, UsersController.routes.logout);
  api.use(routerEndpoints.USERS.root, UsersController.resource);

  api.use(routerEndpoints.PAGES.root, pages({ models, base, pageValidator }));
  api.use(routerEndpoints.PRODUCTS.root, products({ models, base, productValidator }));
  api.use(routerEndpoints.PRODUCT_IMAGES.root, productImages({ models, base, productImageValidator }));
  api.use(routerEndpoints.PRODUCT_CATEGORIES.root, pageCategories({ models, base, pageCategoryValidator }));
  api.use(routerEndpoints.PAGE_SUB_CATEGORIES.root, pageSubCategories({ models, base, pageSubCategoryValidator }));
  api.use(routerEndpoints.PRODUCT_CATEGORIES.root, productCategories({ models, base, productCategoryValidator }));
  api.use(routerEndpoints.PRODUCT_SUB_CATEGORIES.root, productSubCategories({ models, base, productSubCategoryValidator }));

  const ProductOptionsController = productOptions({ models, base, productOptionValidator });
  api.get(routerEndpoints.PRODUCT_OPTIONS.distinct, ProductOptionsController.routes.indexDistinct);
  api.use(routerEndpoints.PRODUCT_OPTIONS.root, ProductOptionsController.resource);

  const ProductFeaturesController = productFeatures({ models, base, productFeatureValidator });
  api.get(routerEndpoints.PRODUCT_FEATURES.distinct, ProductFeaturesController.routes.indexDistinct);
  api.use(routerEndpoints.PRODUCT_FEATURES.root, ProductFeaturesController.resource);

  api.use(routerEndpoints.S3.root, s3uploaderRouter(s3routerConfig));


  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};
