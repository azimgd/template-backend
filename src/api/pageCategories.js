import resource from 'resource-router-middleware';
import flow from 'lodash/flow';

export default ({ base, config, models: { pageCategories }, pageCategoryValidator }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'pageCategory',

	load(req, id, callback) {
		pageCategories.queries.findOne({ where: { id } })
		.then(_ => callback(null, _))
		.catch(base.logRequest);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		pageCategories.queries.findAll()
		.then(res.json.bind(res))
		.catch(base.failRequest.bind(res));
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		const modifiedBody = pageCategoryValidator.cast(body);
		pageCategories.queries.create(modifiedBody)
		.then(res.json.bind(res))
		.catch(base.failRequest.bind(res));
	},

	/** GET /:id - Return a given entity */
	read({ pageCategory }, res) {
		res.json(pageCategory);
	},

	/** PUT /:id - Update a given entity */
	update({ pageCategory, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				pageCategory[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ pageCategory }, res) {
		pageCategories.splice(pageCategories.indexOf(pageCategory), 1);
		res.sendStatus(204);
	}
});
