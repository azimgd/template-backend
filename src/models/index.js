import pagesModel from './pagesModel';
import configModel from './configModel';
import pageCategoriesModel from './pageCategoriesModel';
import pageSubCategoriesModel from './pageSubCategoriesModel';
import productCategoriesModel from './productCategoriesModel';
import productSubCategoriesModel from './productSubCategoriesModel';
import productsModel from './productsModel';

export default ({ config, db }) => ({
	pages: pagesModel({ config, db }),
	config: configModel({ config, db }),
	pageCategories: pageCategoriesModel({ config, db }),
	pageSubCategories: pageSubCategoriesModel({ config, db }),
	productCategories: productCategoriesModel({ config, db }),
	productSubCategories: productSubCategoriesModel({ config, db }),
	products: productsModel({ config, db }),
});
