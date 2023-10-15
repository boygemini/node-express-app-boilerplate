
# emailservice
emailservice simplifies email integration in nodeJs, enabling users to send emails, facilitate OTP verification,  Enhance your app's email functionality effortlessly.
## Example

```javascript

const emailservice = require('emailsevice');
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

``` 

## Authors

- [SHAIK AFRID](https://www.github.com/afriddev)



