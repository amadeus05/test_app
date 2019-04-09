/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name:     {type: 'string', required: true},
    surname:  {type: 'string', required: true},
    login:    {type: 'string', required: true},
    email:    {type: 'string', required: true},
    password: {type: 'string', required: true},


  },
  mainUserData() {
    return _.omit(this, ['password', 'login']);
  }
};

