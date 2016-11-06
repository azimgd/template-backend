import pagesModel from './pagesModel';
import configModel from './configModel';
import categoriesModel from './categoriesModel';
import subCategoriesModel from './subCategoriesModel';
import productsModel from './productsModel';

export default ({ config, db }) => ({
	pages: pagesModel({ config, db }),
	config: configModel({ config, db }),
	categories: categoriesModel({ config, db }),
	subCategories: subCategoriesModel({ config, db }),
	products: productsModel({ config, db }),
});
