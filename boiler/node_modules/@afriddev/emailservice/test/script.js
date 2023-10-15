
const emailservice = require('../core/index.js');
async function sendEmail(){
    const response = await emailservice({toEmail:"afridayan01@gmail.com",
title:"this is my title",
subject:"this is my subject",
body:"this is my body"
})
// you can pass fromEmail and passkey also if you want
console.log(response);

}

sendEmail();