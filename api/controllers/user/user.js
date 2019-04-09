module.exports = {


  friendlyName: 'User',


  description: 'Creating a User',


  inputs: {
    name:    {type: 'string', required: true },
    surname: {type: 'string', required: true },
    login:   {type: 'string', required: true },
    email:   {type: 'string', required: true },
    password:{type: 'string', required: true },
  },


  exits: {
    success: {
      description: '!SUCCESS!'
    },
    failed: {
      description: 'User DB error!'
    }
  },


  fn: async function (inputs, exits) {

    const {
      name     : name,
      surname  : surname,
      login    : login,
      email    : email,
      password : password,
    } = inputs;

    const exist = await User.findone({email: email});

    if (!exist){
      let addUser = await User.create(inputs);
      if (!addUser) {sails.log('New record was added.');}
      else {sails.log('Found "%s"', addUser);}
      return exits.success(addUser);
    } else {
      return exist.failed('This email has already used');
    }
  }

};
