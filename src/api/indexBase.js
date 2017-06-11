import winston from 'winston';
import get from 'lodash/get';
import acl, { aclConstants } from '../acl';

export default {
  /**
   * Get user id, otherwise assign guest user
   */
  getUserFromSession(session) {
    return get(session, 'id', aclConstants.GUEST_USER);
  },

  /**
   * Access control check for given user
   */
  endpointAccessControl(req, res, next, { user }) {
    return acl.isAllowed(user, req.baseUrl, req.method.toLowerCase())
    .then((isAllowed) => {
      if (isAllowed) { return undefined; }
      throw new Error('User is not allowed');
    })
    .catch(err => err)
    .then(next);
  },

  logError(error) {
    winston.log('error', error);
    return error;
  },

  failRequest(error) {
    winston.log('error', error);
    this.status(500).json({ error });
  },
};
