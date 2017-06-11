import AccessControl from 'acl';

/**
 * Constatns
 */
export const aclConstants = {
  GUEST_USER: 'guestUser',
  ADMIN_USER: 'adminUser',
  LOGGED_USER: 'loggedUser',
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
          '/api/users',
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
  {
    roles: ['admin'],
    allows: [
      {
        resources: [
          '/api/users',
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
        permissions: ['get', 'post', 'put', 'patch', 'delete'] },
    ],
  },
]);


acl.addUserRoles(aclConstants.GUEST_USER, 'guest');
acl.addUserRoles(aclConstants.ADMIN_USER, 'admin');

export default acl;
