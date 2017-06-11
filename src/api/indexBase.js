import winston from 'winston';
import get from 'lodash/get';
import has from 'lodash/has';
import acl, { aclConstants } from '../services/acl';

export default {
  /**
   * Get user role, otherwise return guest user role
   */
  getUserRoleFromSession(session) {
    if (!has(session, 'id')) {
      return aclConstants.GUEST_USER;
    }

    return aclConstants[get(session, 'role', aclConstants.GUEST_USER)];
  },

  /**
   * Access control check for given user
   */
  endpointAccessControl(req, res, next, { userRole }) {
    return acl.isAllowed(userRole, req.baseUrl, req.method.toLowerCase())
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
