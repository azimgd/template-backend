import resource from 'resource-router-middleware';
import flow from 'lodash/flow';

export default ({ base, models: { productImages }, productImageValidator }) => resource({

  /** Property name to store preloaded entity on `request`. */
  id: 'productImage',

  middleware(req, res, next) {
    const userRole = base.getUserRoleFromSession(req.user);
    base.endpointAccessControl(req, res, next, { userRole });
  },

  load(req, id, callback) {
    productImages.queries.findOne({ where: { id } })
    .then(_ => callback(null, _))
    .catch(flow([base.logError, callback]));
  },

  /** GET / - List all entities */
  index({ params, query }, res) {
    const modifiedQuery = productImageValidator.castIndexQuery({ ...query, productId: query.id });
    productImages.queries.findAll(modifiedQuery)
    .then(res.json.bind(res))
    .catch(base.failRequest.bind(res));
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    const modifiedBody = productImageValidator.cast(body);
    productImages.queries.create(modifiedBody)
    .then(res.json.bind(res))
    .catch(base.failRequest.bind(res));
  },

  /** GET /:id - Return a given entity */
  read({ productImage }, res) {
    res.json(productImage);
  },

  /** PUT /:id - Update a given entity */
  update({ productImage, body }, res) {
    for (const key in body) {
      if (key !== 'id') {
        productImage[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete({ productImage }, res) {
    productImages.splice(productImages.indexOf(productImage), 1);
    res.sendStatus(204);
  },
});
