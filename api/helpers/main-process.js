module.exports = {


  friendlyName: 'Main process',


  description: 'Main cycle for send notifications over to users',


  inputs: {},


  exits: {

    success: {
      description: 'All done.',
    },
    failed: {
      description: 'Main process ERROR'
    }

  },


  fn: async function (inputs, exits) {

    const maxStatus = 5
    const nodeMailer = require("nodemailer");

    let words = await Word.find({});
    if (words.length !== 0) {

      for (let word of words) {
        let obj = word
        const {
          word: objWord,
          translate: wordTranslate,
          notification: objNotification,
          dateOfCreation: objDate,
          email: objEmail
        } = obj

        if (new Date().getTime() >= objDate && objNotification <= maxStatus) {
          let sender = await sendOnEmail(objEmail, objWord, wordTranslate)
          if (objNotification < maxStatus) {
            let updatedRecord = await Word.updateOne({dateOfCreation: objDate})
              .set({
                notification: objNotification + 1,
                dateOfCreation: checkStatusSetDate(objNotification, objDate),
              });
            if (updatedRecord) {
              sails.log('success ' + updatedRecord.id + ': ' + updatedRecord.dateOfCreation);
            } else {
              sails.log('The database does not contain a record with the date:' + objDate);
            }
          } else {
            let destroyRecord = await Word.destroyOne({dateOfCreation: objDate});
            sails.log(`Record with id: ${obj.id} was destroyed because of notification reached status 5: ` + obj.notification)
          }
        }
      }
    } else console.log(`Current amount of records in DB: ${words.length}`)


    function sendOnEmail(email, word, translate) {
      let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'acctestdev5@gmail.com',
          pass: 'cthutqgfyxtyrj05'
        }
      });
      const mailOptions = {
        from: '~ words reminder ~',
        to: email,
        subject: `It is time to repeat this word: ${word} : ${translate}`,
        html: '<p>`You should repeat this word: ${word} : ${translate}`</p>'
      };
      transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
          sails.log(err)
        } else {
          sails.log('MASSAGE WAS SENT to user=> ' + email)
        }
      })
    }

    function checkStatusSetDate(currentStatus, currentDate) {

      const minutes = 1000 * 60;
      const hours   = minutes * 60;
      const days    = hours * 24;
      const years   = days * 365;

      // =======times for real tasks ==========
      const nine      = 9 * hours
      const day       = hours * 24;
      const seven     = 7 * days
      const twelve    = 12 * days
      const firstTime = 5 * minutes

      let notificationTime = currentStatus
      switch (notificationTime) {
        case 1:
          return intpars(currentDate, 10000) //test time to dont wait
          break
        case 2:
          return intpars(currentDate, 10000) //test time
          break
        case 3:
          return intpars(currentDate, 10000) //test time
          break
        case 4:
          return intpars(currentDate, 10000) //test time
          break
        case 5:
          return intpars(currentDate, 10000) //test time
          break
      }

      function intpars(stringDate, value){
        return Number.parseInt(stringDate, 10) + value
      }
      return 'new date for notification'
    }

    return exits.success('Success')
  }

};

