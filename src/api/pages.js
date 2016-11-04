import resource from 'resource-router-middleware';

export default ({ config, models: { pages } }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'page',

	load(req, id, callback) {
		let page = pages.find( page => page.id===id ),
			err = page ? null : 'Not found';
		callback(err, page);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json([]);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = pages.length.toString(36);
		pages.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ page }, res) {
		res.json(page);
	},

	/** PUT /:id - Update a given entity */
	update({ page, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				page[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ page }, res) {
		pages.splice(pages.indexOf(page), 1);
		res.sendStatus(204);
	}
});
