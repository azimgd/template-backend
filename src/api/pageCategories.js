import resource from 'resource-router-middleware';
import flow from 'lodash/flow';

export default ({ base, models: { pageCategories }, pageCategoryValidator }) => resource({

  /** Property name to store preloaded entity on `request`. */
  id: 'pageCategory',

  middleware(req, res, next) {
    const user = base.getUserFromSession(req.session);
    base.endpointAccessControl(req, res, next, { user });
  },

  load(req, id, callback) {
    pageCategories.queries.findOne({ where: { id } })
    .then(_ => callback(null, _))
    .catch(flow([base.logError, callback]));
  },

  /** GET / - List all entities */
  index({ params, query }, res) {
    const modifiedQuery = pageCategoryValidator.castIndexQuery(query);
    pageCategories.queries.findAll(modifiedQuery)
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
    for (const key in body) {
      if (key !== 'id') {
        pageCategory[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete({ pageCategory }, res) {
    pageCategories.splice(pageCategories.indexOf(pageCategory), 1);
    res.sendStatus(204);
  },
});
