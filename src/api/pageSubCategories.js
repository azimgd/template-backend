import resource from 'resource-router-middleware';

export default ({ base: { failRequest }, config, models: { pageSubCategories }, pageSubCategoryValidator }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'pageSubCategory',

	load(req, id, callback) {
		pageSubCategories.queries.findOne(id)
		.then(_ => callback(null, _))
		.catch(callback);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		pageSubCategories.queries.findAll()
		.then(res.json.bind(res))
		.catch(failRequest.bind(res));
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		const modifiedBody = pageSubCategoryValidator.cast(body);
		pageSubCategories.queries.create(modifiedBody)
		.then(res.json.bind(res))
		.catch(failRequest.bind(res));
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
