import { version } from '../../package.json';
import { Router } from 'express';

import pages from './pages';
import pageValidator from '../validators/pageValidator';

import products from './products';
import productValidator from '../validators/productValidator';

import pageCategories from './pageCategories';
import pageCategoryValidator from '../validators/pageCategoryValidator';
import pageSubCategories from './pageSubCategories';
import pageSubCategoryValidator from '../validators/pageSubCategoryValidator';

import productCategories from './productCategories';
import productCategoryValidator from '../validators/productCategoryValidator';
import productSubCategories from './productSubCategories';
import productSubCategoryValidator from '../validators/productSubCategoryValidator';


export default ({ config, models }) => {
	let api = Router();

	api.use('/pages', pages({ config, models, pageValidator }));
	api.use('/products', products({ config, models, productValidator }));
	api.use('/pageCategories', pageCategories({ config, models, pageCategoryValidator }));
	api.use('/pageSubCategories', pageSubCategories({ config, models, pageSubCategoryValidator }));
	api.use('/productCategories', productCategories({ config, models, productCategoryValidator }));
	api.use('/productSubCategories', productSubCategories({ config, models, productSubCategoryValidator }));

	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
