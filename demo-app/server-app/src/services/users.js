const bcrypt = require('bcrypt');
const { isNil, omit } = require('lodash');

class Users {

  constructor(db) {
    this._db = db;
  }

  get _users() {
    return this._db.get('users');
  }

  all() {
    return this._users;
  }

  one(userId) {
    return this._users.getById(userId);
  }

  oneByUsername(username) {
    return this._users.find(u => u.username === username);
  }

  async append(user, saltRounds = 10) {

    if (isNil(this.oneByUsername(user.username))) {
      throw new Error('username not available');
    }

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const newUser = this
      ._users
      .insert({ ...omit(user, ['password']), password: hashedPassword })
      .write();

    return newUser;

  }

  replace(user) {
    this._users.updateById(user.id, user);
  }

  remove(userId) {
    this._users.removeById(userId);
  }

}

module.exports = Users;
