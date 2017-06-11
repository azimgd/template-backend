import resource from 'resource-router-middleware';
import flow from 'lodash/flow';

export default ({ base, models: { productSubCategories }, productSubCategoryValidator }) => resource({

  /** Property name to store preloaded entity on `request`. */
  id: 'productSubCategory',

  middleware(req, res, next) {
    const user = base.getUserFromSession(req.session);
    base.endpointAccessControl(req, res, next, { user });
  },

  load(req, id, callback) {
    productSubCategories.queries.findOne({ where: { id } })
    .then(_ => callback(null, _))
    .catch(flow([base.logError, callback]));
  },

  /** GET / - List all entities */
  index({ params, query }, res) {
    const modifiedQuery = productSubCategoryValidator.castIndexQuery(query);
    productSubCategories.queries.findAll(modifiedQuery)
    .then(res.json.bind(res))
    .catch(base.failRequest.bind(res));
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    const modifiedBody = productSubCategoryValidator.cast(body);
    productSubCategories.queries.create(modifiedBody)
    .then(res.json.bind(res))
    .catch(base.failRequest.bind(res));
  },

  /** GET /:id - Return a given entity */
  read({ productSubCategory }, res) {
    res.json(productSubCategory);
  },

  /** PUT /:id - Update a given entity */
  update({ productSubCategory, body }, res) {
    for (const key in body) {
      if (key !== 'id') {
        productSubCategory[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete({ productSubCategory }, res) {
    productSubCategories.splice(productSubCategories.indexOf(productSubCategory), 1);
    res.sendStatus(204);
  },
});
