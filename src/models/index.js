import pagesModel from './pages';

export default ({ config, db }) => {
	const pages = pagesModel({ config, db });

	return {
		pages,
	};
}
