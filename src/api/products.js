import resource from 'resource-router-middleware';

export default ({ base: { failRequest }, config, models: { products }, productValidator }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'product',

	load(req, id, callback) {
		products.queries.findOne({ where: { id } })
		.then(_ => callback(null, _))
		.catch(callback);
	},

	/** GET / - List all entities */
	index({ params, query }, res) {
		const modifiedQuery = productValidator.castIndexQuery(query);
		products.queries.findAll(modifiedQuery)
		.then(res.json.bind(res))
		.catch(failRequest.bind(res));
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		const modifiedBody = productValidator.cast(body);
		products.queries.create(modifiedBody)
		.then(res.json.bind(res))
		.catch(failRequest.bind(res));
	},

	/** GET /:id - Return a given entity */
	read({ product }, res) {
		res.json(product);
	},

	/** PUT /:id - Update a given entity */
	update({ product, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				product[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ product }, res) {
		products.splice(products.indexOf(product), 1);
		res.sendStatus(204);
	}
});
