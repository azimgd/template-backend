import resource from 'resource-router-middleware';

export default ({ config, models: { productCategories }, productCategoryValidator }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'productCategory',

	load(req, id, callback) {
		productCategories.queries.findOne(id).then(_ => callback(null, _));
	},

	/** GET / - List all entities */
	index({ params }, res) {
		productCategories.queries.findAll().then(_ => res.json(_));
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		const modifiedBody = productCategoryValidator.cast(body);
		productCategories.queries.create(modifiedBody).then(_ => res.json(_));
	},

	/** GET /:id - Return a given entity */
	read({ productCategory }, res) {
		res.json(productCategory);
	},

	/** PUT /:id - Update a given entity */
	update({ productCategory, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				productCategory[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ productCategory }, res) {
		productCategories.splice(productCategories.indexOf(productCategory), 1);
		res.sendStatus(204);
	}
});
