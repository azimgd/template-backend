import AccessControl from 'acl';

/**
 * Constatns
 */
export const aclConstants = {
  GUEST_USER: 'guestUserType',
  ADMIN_USER: 'adminUserType',
  LOGGED_USER: 'loggedUserType',
};

//eslint-disable-next-line
const acl = new AccessControl(new AccessControl.memoryBackend());

// allow function accepts arrays as any parameter
acl.allow([
  {
    roles: ['guest'],
    allows: [
      {
        resources: [
          '/api/pages',
          '/api/products',
          '/api/productImages',
          '/api/pageCategories',
          '/api/pageSubCategories',
          '/api/productCategories',
          '/api/productSubCategories',
          '/api/productOptions',
          '/api/productFeatures',
          '/api/pages',
        ],
        permissions: ['get'] },
    ],
  },
]);


acl.addUserRoles(aclConstants.GUEST_USER, 'guest');

export default acl;
