import resource from 'resource-router-middleware';

export default ({ base: { failRequest }, config, models: { productImages }, productImageValidator }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'productImage',

	load(req, id, callback) {
		productImages.queries.findOne({ where: { id } })
		.then(_ => callback(null, _))
		.catch(callback);
	},

	/** GET / - List all entities */
	index({ query, params }, res) {
		productImages.queries.findAll({ productId: query.id })
		.then(res.json.bind(res))
		.catch(failRequest.bind(res));
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		const modifiedBody = productImageValidator.cast(body);
		productImages.queries.create(modifiedBody)
		.then(res.json.bind(res))
		.catch(failRequest.bind(res));
	},

	/** GET /:id - Return a given entity */
	read({ productImage }, res) {
		res.json(productImage);
	},

	/** PUT /:id - Update a given entity */
	update({ productImage, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				productImage[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ productImage }, res) {
		productImages.splice(productImages.indexOf(productImage), 1);
		res.sendStatus(204);
	}
});
