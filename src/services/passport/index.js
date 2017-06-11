import { Strategy } from 'passport-local';

const userExists = (done, user) => {
  if (!user) {
    return done(null, false);
  }
  return user;
};

const userValidatePassword = (done, password, user) => {
  if (!user.validatePassword(password)) {
    return done(null, false);
  }
  return user;
};

export const initLocalStrategy = models => new Strategy((username, password, done) => {
  models.users.queries.findOne({ where: { username } })
  .then(user => userExists(done, user))
  .then(user => userValidatePassword(done, password, user))
  .then(user => done(null, user))
  .catch(done);
});

export default {};
