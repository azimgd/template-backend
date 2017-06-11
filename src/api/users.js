import resource from 'resource-router-middleware';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import flow from 'lodash/flow';

export default ({ base, models: { users }, userValidator }) => ({
  resource: resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'user',

    middleware(req, res, next) {
      const userRole = base.getUserRoleFromSession(req.user);
      base.endpointAccessControl(req, res, next, { userRole });
    },

    load(req, id, callback) {
      users.queries.findOne({ where: { id } })
      .then(_ => callback(null, _))
      .catch(flow([base.logError, callback]));
    },

    /** GET / - List all entities */
    index({ query, user }, res) {
      const modifiedQuery = userValidator.castIndexQuery(query);
      users.queries.findAll(modifiedQuery)
      .then(res.json.bind(res))
      .catch(base.failRequest.bind(res));
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      const modifiedBody = userValidator.cast(body);
      users.queries.create(modifiedBody)
      .then(res.json.bind(res))
      .catch(base.failRequest.bind(res));
    },

    /** GET /:id - Return a given entity */
    read({ user }, res) {
      res.json(user);
    },

    /** PUT /:id - Update a given entity */
    update({ user, body }, res) {
      for (const key in body) {
        if (key !== 'id') {
          user[key] = body[key];
        }
      }
      res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({ user }, res) {
      users.splice(users.indexOf(user), 1);
      res.sendStatus(204);
    },
  }),

  routes: ({
    login(req, res, next) {
      passport.authenticate('local', { session: true })(req, res, next);
    },

    loginOnSuccess(req, res) {
      const user = req.user.toJSON();
      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.json({ ...user, token });
    },

    logout({ logout }, res) {
      logout();
      res.json({});
    },
  }),
});
