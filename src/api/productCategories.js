import resource from 'resource-router-middleware';
import flow from 'lodash/flow';

export default ({ base, config, models: { productCategories }, productCategoryValidator }) => resource({

  /** Property name to store preloaded entity on `request`. */
  id: 'productCategory',

  load(req, id, callback) {
    productCategories.queries.findOne({ where: { id } })
    .then(_ => callback(null, _))
    .catch(flow([base.logError, callback]));
  },

  /** GET / - List all entities */
  index({ params, query }, res) {
    const modifiedQuery = productCategoryValidator.castIndexQuery(query);
    productCategories.queries.findAll(modifiedQuery)
    .then(res.json.bind(res))
    .catch(base.failRequest.bind(res));
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    const modifiedBody = productCategoryValidator.cast(body);
    productCategories.queries.create(modifiedBody)
    .then(res.json.bind(res))
    .catch(base.failRequest.bind(res));
  },

  /** GET /:id - Return a given entity */
  read({ productCategory }, res) {
    res.json(productCategory);
  },

  /** PUT /:id - Update a given entity */
  update({ productCategory, body }, res) {
    for (const key in body) {
      if (key !== 'id') {
        productCategory[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete({ productCategory }, res) {
    productCategories.splice(productCategories.indexOf(productCategory), 1);
    res.sendStatus(204);
  },
});
