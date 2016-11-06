import { version } from '../../package.json';
import { Router } from 'express';
import pages from './pages';
import products from './products';
import productValidator from '../validators/productValidator';

export default ({ config, models }) => {
	let api = Router();

	api.use('/pages', pages({ config, models }));
	api.use('/products', products({ config, models, productValidator }));

	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
