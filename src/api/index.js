import { version } from '../../package.json';
import { Router } from 'express';
import s3uploaderRouter from 'react-s3-uploader/s3router';

import pages from './pages';
import pageValidator from '../validators/pageValidator';

import products from './products';
import productValidator from '../validators/productValidator';

import pageCategories from './pageCategories';
import pageCategoryValidator from '../validators/pageCategoryValidator';
import pageSubCategories from './pageSubCategories';
import pageSubCategoryValidator from '../validators/pageSubCategoryValidator';

import base from './indexBase';
import productCategories from './productCategories';
import productCategoryValidator from '../validators/productCategoryValidator';
import productSubCategories from './productSubCategories';
import productSubCategoryValidator from '../validators/productSubCategoryValidator';
import productOptions from './productOptions';
import productOptionValidator from '../validators/productOptionValidator';
import productImages from './productImages';
import productImageValidator from '../validators/productImageValidator';

const s3routerConfig = {
	bucket: 'shoptemplate',
	region: 'eu-west-1',
	signatureVersion: 'v4',
	headers: {'Access-Control-Allow-Origin': '*'},
};

export default ({ config, models }) => {
	let api = Router();

	api.use('/pages', pages({ config, models, base, pageValidator }));
	api.use('/products', products({ config, models, base, productValidator }));
	api.use('/productImages', productImages({ config, models, base, productImageValidator }));
	api.use('/pageCategories', pageCategories({ config, models, base, pageCategoryValidator }));
	api.use('/pageSubCategories', pageSubCategories({ config, models, base, pageSubCategoryValidator }));
	api.use('/productCategories', productCategories({ config, models, base, productCategoryValidator }));
	api.use('/productSubCategories', productSubCategories({ config, models, base, productSubCategoryValidator }));
	api.use('/productOptions', productOptions({ config, models, base, productOptionValidator }));
	api.use('/s3', s3uploaderRouter(s3routerConfig));

	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
