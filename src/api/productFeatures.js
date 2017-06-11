import resource from 'resource-router-middleware';
import flow from 'lodash/flow';

export default ({ base, models: { productFeatures }, productFeatureValidator }) => ({
  resource: resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'productFeature',

    middleware(req, res, next) {
      const userRole = base.getUserRoleFromSession(req.user);
      base.endpointAccessControl(req, res, next, { userRole });
    },

    load(req, id, callback) {
      productFeatures.queries.findOne({ where: { id } })
      .then(_ => callback(null, _))
      .catch(flow([base.logError, callback]));
    },

    /** GET / - List all entities */
    index({ params, query }, res) {
      const modifiedQuery = productFeatureValidator.castIndexQuery({ ...query, productId: query.id });
      productFeatures.queries.findAll(modifiedQuery)
      .then(res.json.bind(res))
      .catch(base.failRequest.bind(res));
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      const modifiedBody = productFeatureValidator.cast(body);
      productFeatures.queries.create(modifiedBody)
      .then(res.json.bind(res))
      .catch(base.failRequest.bind(res));
    },

    /** GET /:id - Return a given entity */
    read({ productFeature }, res) {
      res.json(productFeature);
    },

    /** PUT /:id - Update a given entity */
    update({ productFeature, body }, res) {
      for (const key in body) {
        if (key !== 'id') {
          productFeature[key] = body[key];
        }
      }
      res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({ productFeature }, res) {
      productFeatures.splice(productFeatures.indexOf(productFeature), 1);
      res.sendStatus(204);
    },
  }),

  routes: ({
    indexDistinct({ query, params }, res) {
      productFeatures.queries.findAllDistinct({ productId: query.id })
      .then(res.json.bind(res))
      .catch(base.failRequest.bind(res));
    },
  }),
});
