import resource from 'resource-router-middleware';

export default ({ config, models: { pageSubCategories }, pageSubCategoryValidator }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'pageSubCategory',

	load(req, id, callback) {
		pageSubCategories.queries.findOne(id).then(_ => callback(null, _));
	},

	/** GET / - List all entities */
	index({ params }, res) {
		pageSubCategories.queries.findAll().then(_ => res.json(_));
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		const modifiedBody = pageSubCategoryValidator.cast(body);
		pageSubCategories.queries.create(modifiedBody).then(_ => res.json(_));
	},

	/** GET /:id - Return a given entity */
	read({ pageSubCategory }, res) {
		res.json(pageSubCategory);
	},

	/** PUT /:id - Update a given entity */
	update({ pageSubCategory, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				pageSubCategory[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ pageSubCategory }, res) {
		pageSubCategories.splice(pageSubCategories.indexOf(pageSubCategory), 1);
		res.sendStatus(204);
	}
});
