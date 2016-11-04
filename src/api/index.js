import { version } from '../../package.json';
import { Router } from 'express';
import pages from './pages';

export default ({ config, models }) => {
	let api = Router();

	api.use('/pages', pages({ config, models }));

	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
