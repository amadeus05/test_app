/**
 * Word.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes:        {
    word:            { type: 'string'},
    translate:       { type: 'string'},
    dateOfCreation : { type: 'string'},
    email          : { type: 'string'},
    notification   : { type: 'number'},
  },

};

