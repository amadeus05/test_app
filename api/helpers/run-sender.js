module.exports = {
  friendlyName: 'Run sender',
  description: '',
  inputs: {},
  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    const maxStatus = 5;
    const nodeMailer = require('nodemailer');
    let words = await Word.find({});
    if (words.length !== 0) {
      for (let word of words) {
        const {
          word:           objWord,
          translate:      wordTranslate,
          notification:   objNotification,
          dateOfCreation: objDate,
          email:          objEmail
        } = word;
        if (new Date().getTime() >= objDate && objNotification <= maxStatus) {
          await sendOnEmail(objEmail, objWord, wordTranslate);
          if (objNotification < maxStatus) {
            let updatedRecord = await Word.updateOne({dateOfCreation: objDate})
              .set({
                notification: objNotification + 1,
                dateOfCreation: checkStatusSetDate(objNotification, objDate),
              });
            if (updatedRecord) {
              sails.log(`success, STATUS => ${objNotification}[user id]:`
                + updatedRecord.id + ': ' + new Date(Number.parseInt(objDate)));
            } else {
              sails.log('The database does not contain a record with the date:' + objDate);
            }
          } else {
            await Word.destroyOne({dateOfCreation: objDate});
            sails.log(`Record with id: ${obj.id} was destroyed because of notification reached status 5: `
              + obj.notification);
          }
        }
      }
    } else {
      console.log(`Current amount of records in DB: ${words.length}`);
    }


    function sendOnEmail(email, word, translate) {
      let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: sails.config.custom.mailgunDomain,
          pass: sails.config.custom.mailgunSecret,
        }
      });
      const mailOptions = {
        from: '~ words reminder ~',
        to: email,
        subject: `It is time to repeat this word: ${word} : ${translate}`,
        html: `<p>You should repeat this word: ${word} : ${translate}</p>`
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          sails.log(err);
        } else {
          sails.log('MASSAGE WAS SENT to user=> ' + email);
        }
      });
    }

    function checkStatusSetDate(currentStatus, currentDate) {

      const minutes = 1000 * 60;
      const hours   = minutes * 60;
      const days    = hours * 24;
      const years   = days * 365;

      // =======times for real tasks ==========
      const timeInterval = Object.freeze({
        FIRST_TIME:  5 * minutes,
        NINE_HOURS:  9 * hours,
        ONE_DAY:     24 * hours,
        SEVEN_DAYS:  7 * days,
        TWELVE_DAYS: 12 * days,
      });

      const status = Object.freeze({
        FIRST_REPETITION: 1,
        SECOND_REPETITION: 2,
        THIRD_REPETITION: 3,
        FOURTH_REPETITION: 4,
        FIFTH_REPETITION: 5
      });

      let notificationTime = currentStatus;
      switch (notificationTime) {
        case status.FIRST_REPETITION:
          return intpars(currentDate, timeInterval.FIRST_TIME);
        case status.SECOND_REPETITION:
          return intpars(currentDate, timeInterval.NINE_HOURS);
        case status.THIRD_REPETITION:
          return intpars(currentDate, timeInterval.ONE_DAY);
        case status.FOURTH_REPETITION:
          return intpars(currentDate, timeInterval.SEVEN_DAYS);
        case status.FIFTH_REPETITION:
          return intpars(currentDate, timeInterval.TWELVE_DAYS);

      }

      function intpars(stringDate, value) {
        return Number.parseInt(stringDate, 10) + value;
      }

      return checkStatusSetDate.name + ' new date for the notification';
    }

    return exits.success('Success');
  }


};

