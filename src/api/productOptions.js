import resource from 'resource-router-middleware';

export default ({ base: { failRequest }, config, models: { productOptions }, productOptionValidator }) => ({
	resource: resource({
		/** Property name to store preloaded entity on `request`. */
		id : 'productOption',

		load(req, id, callback) {
			productOptions.queries.findOne({ where: { id } })
			.then(_ => callback(null, _))
			.catch(callback);
		},

		/** GET / - List all entities */
		index({ query, params }, res) {
			productOptions.queries.findAll({ productId: query.id })
			.then(res.json.bind(res))
			.catch(failRequest.bind(res));
		},

		/** POST / - Create a new entity */
		create({ body }, res) {
			const modifiedBody = productOptionValidator.cast(body);
			productOptions.queries.create(modifiedBody)
			.then(res.json.bind(res))
			.catch(failRequest.bind(res));
		},

		/** GET /:id - Return a given entity */
		read({ productOption }, res) {
			res.json(productOption);
		},

		/** PUT /:id - Update a given entity */
		update({ productOption, body }, res) {
			for (let key in body) {
				if (key!=='id') {
					productOption[key] = body[key];
				}
			}
			res.sendStatus(204);
		},

		/** DELETE /:id - Delete a given entity */
		delete({ productOption }, res) {
			productOptions.splice(productOptions.indexOf(productOption), 1);
			res.sendStatus(204);
		}
	}),

	routes: ({
		indexDistinct({ query, params }, res) {
			productOptions.queries.findAllDistinct({ productId: query.id })
			.then(res.json.bind(res))
			.catch(failRequest.bind(res));
		},
	}),
});
