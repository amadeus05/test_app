module.exports = {


  friendlyName: 'Word',

  description: 'Add a new word to the app database',

  inputs: {
    word:            {type: 'string'},
    translate:       {type: 'string'},
    dateOfCreation : {type: 'string'},
    email          : {type: 'string'},
    notification   : {type: 'number'},
  },

  exits: {
    success:{
      newRecordWasEddiedSuccessfully: 'SUCCESS',
    },
    failed:{
      description: 'Database error'
    },

  },

  fn: async function (inputs, exits) {
    inputs.dateOfCreation = Number.parseInt(new Date().getTime()) + (10000)
    inputs.notification = 1                               // default status word's notification
    const {      word          : newWord,
                 translate     : translate,
                 dateOfCreation: current,
                 email         : email,
                 notification  : notification
    } = inputs

    let result    = await Word.create(inputs)
    let newRecord = await Word.find({dateOfCreation: current});
    if (!newRecord) {
      sails.log('Could not find this record, sorry.');
    }
    else {
      sails.log('Found "%s"', newRecord);
    }
      return exits.success(newRecord);

  }
};

