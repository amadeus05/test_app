/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  setInterval(async function ()
  {
    await sails.helpers.mainProcess();
  },
 10000)
 //  const maxStatus = 5
 //  const nodemailer = require("nodemailer");
 //  var currentDate = 103984093            //new Date().getTime()  we use more less date so that don't wait for next date
 //  setInterval(async function () {
 //  var words = await Word.find({});
 //   for (word in words){
 //     let obj = words[word]
 //     const {
 //             word           : objWord,
 //             translate      : wordTranslate,
 //             notification   : objNotification,
 //             dateOfCreation : objDate,
 //             email          : objEmail } = obj
 //     if (objDate >= currentDate + 10 || objDate < currentDate -100 && objNotification <= maxStatus)
 //     {
 //           var updatedUser = await Word.updateOne({dateOfCreation: objDate})
 //             .set({
 //               notification: Math.floor(Math.random() * (+10 - +3)) + +3,
 //               word  : 'newWord' + Math.floor(Math.random() * (+10 - +3)) + +3
 //             });
 //           if (updatedUser) {
 //             sails.log('success ' + updatedUser.notification + ': ' + updatedUser.word);
 //           }
 //           else {
 //             sails.log('The database does not contain a word with date:' + objDate);
 //           }
 //           fEmail(objEmail,objWord,wordTranslate)
 //     } else {
 //       var destroyedRecord = await Word.destroyOne({dateOfCreation: objDate});
 //     }
 //   }
 // }, 3000)
 //
 //
 //  function sendOnEmail(email, word, translate) {
 //    var transporter = nodemailer.createTransport({
 //      service: 'gmail',
 //      auth: {
 //        user: 'acctestdev5@gmail.com',
 //        pass: 'cthutqgfyxtyrj05'
 //      }
 //    });
 //    const mailOptions = {
 //      from   : 'sender@email.com',
 //      to     :  email,
 //      subject: `You should repeat this word: ${word} : ${translate}`,
 //      html   : '<p>`You should repeat this word: ${word} : ${translate}`</p>'
 //    };
 //    //transporter.sendMail(mailOptions,function (err,res) {
 //    //     if (err){
 //    //       sails.log(err)
 //    //     } else {
 //    //       sails.log("SUCCESS")
 //    //     }
 //    // })
 // }






















  //
  // var   minutes   =  1000    * 60;
  // var   hours     =  minutes * 60;
  // var   days      =  hours   * 24;
  // var   years     =  days    * 365;
  // const nine      =  9       * hours
  // const day       =  days
  // const seven     =  7       * days
  // const twelve    =  12      * days
  // const firstTime =  5       * minutes
  //
  // //this function return the next time of notification for current object
  // function checkStatus(currentStatus) {
  //   let notifTime = currentStatus
  //   switch(notifTime){
  //     case 1:
  //       return firstTime
  //       break
  //     case 2:
  //       return nine
  //       break
  //     case 3:
  //       return day
  //       break
  //     case 4:
  //       return seven
  //       break
  //     case 5:
  //       return twelve
  //       break
  //   }
  //   return 'after exec we get current date + (date of current status)'
  // }











































































  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

};

