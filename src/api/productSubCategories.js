import resource from 'resource-router-middleware';

export default ({ config, models: { productSubCategories }, productSubCategoryValidator }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'productSubCategory',

	load(req, id, callback) {
		productSubCategories.queries.findOne(id).then(_ => callback(null, _));
	},

	/** GET / - List all entities */
	index({ params }, res) {
		productSubCategories.queries.findAll().then(_ => res.json(_));
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		const modifiedBody = productSubCategoryValidator.cast(body);
		productSubCategories.queries.create(modifiedBody).then(_ => res.json(_));
	},

	/** GET /:id - Return a given entity */
	read({ productSubCategory }, res) {
		res.json(productSubCategory);
	},

	/** PUT /:id - Update a given entity */
	update({ productSubCategory, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				productSubCategory[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ productSubCategory }, res) {
		productSubCategories.splice(productSubCategories.indexOf(productSubCategory), 1);
		res.sendStatus(204);
	}
});
