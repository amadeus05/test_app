module.exports = {


  friendlyName: 'NewReiterationAdding',

  description: 'Add a new word to the app database for repeat',

  inputs: {
    word: {
      type: 'string',
      require: true,
    },
    translate: {
      type: 'string',
      require: true,
    },
    email: {
      type: 'string',
      require: true,
    },
    dateOfCreation: {
      type: 'string'
    },
    notification: {
      type: 'number'
    },
  },

  exits: {
    success: {
      newRecordWasEddiedSuccessfully: 'SUCCESS',
    },
    failed: {
      description: 'Database error'
    },

  },

  fn: async function (inputs, exits) {
    const START_NOTIFICATION_STATUS = 1;
    const START_INTERVAL = 10000;
    const data = {
      ...inputs,
      dateOfCreation: Number.parseInt(new Date().getTime()) + START_INTERVAL,
      notification: START_NOTIFICATION_STATUS
    };
    const {
      dateOfCreation: current,
    } = data;

    await Word.create(data);
    let newRecord = await Word.find({dateOfCreation: current});
    if (!newRecord) {
      sails.log('error');
    } else {
      sails.log('Found "%s"', newRecord);
    }
    return exits.success(newRecord);
  }
};

