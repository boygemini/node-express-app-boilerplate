/**
 * 
 * @param fromEmail fromemail
 * @param passkey app password
 * @param toEmail target email
 * @param title messagetitle
 * @param subject messagesubject
 * @param body messagebody
 * 
 * @returns async response 
 */
async function emailservice({
  fromEmail,
  passkey,
  toEmail,
  title,
  subject,
  body,
} = {}) {
  /**
   * const variables for server URLS
   *
   */
  const serverUrl = "https://sendemail.cyclic.app";
  const sendMethodServerUrl = "https://sendemail.cyclic.app/sendEmail";

  /**
   * @returns true when server is running
   * @return false when sever is of
   *
   */
  async function checkServer() {
    let response = await fetch(serverUrl);
    let serverResponse = await response.json();
    if (serverResponse["message"]["serverStatus"] == "running") {
      return true;
    } else {
      return false;
    }
  }

  if (await checkServer()) {
    if (fromEmail == undefined || fromEmail == null || undefined == "") {
      if (title == undefined || title == null || title == "") {
        if (subject == undefined || subject == null || subject == "") {
          if (body == "" || body == undefined || body == null) {
            var responseBody = JSON.stringify({
              toEmail: `${toEmail}`,
            });
          } else {
            var responseBody = JSON.stringify({
              body:`${body}`,
              toEmail: `${toEmail}`,
            });
          }
        } 
        else {
          if (body == "" || body == undefined || body == null) {
            var responseBody = JSON.stringify({
              toEmail: `${toEmail}`,
            });
          } else {
            var responseBody = JSON.stringify({
              body:`${body}`,
              subject:`${subject}`,
              toEmail: `${toEmail}`,
            });
          }
        }
      } 
      else {
        if (subject == undefined || subject == null || subject == "") {
          if (body == "" || body == undefined || body == null) {
            var responseBody = JSON.stringify({
              title:`${title}`,
              toEmail: `${toEmail}`,
            });
          } else {
            var responseBody = JSON.stringify({
              body:`${body}`,
              title:`${title}`,
              toEmail: `${toEmail}`,
            });
          }
        } 
        else {
          if ( body == undefined || body == null || body == "" ) {
            var responseBody = JSON.stringify({
              title:`${title}`,
              subject:`${subject}`,
              toEmail: `${toEmail}`,
            });
          } else {
            var responseBody = JSON.stringify({
              body:`${body}`,
              title:`${title}`,
              subject:`${subject}`,
              toEmail: `${toEmail}`,
            });
          }
        }
      }
    } else if (fromEmail != undefined || fromEmail != null || fromEmail != "") {
      if (passkey != undefined || passkey != null || passkey == "") {
        var responseBody = JSON.stringify({
          fromEmail: `${fromEmail}`,
          passkey: `${passkey}`,
          title: `${title}`,
          subject: `${subject}`,
          toEmail: `${toEmail}`,
          body: `${body}`,
        });
      } else {
        var responseBody = JSON.stringify({
          title: `${title}`,
          subject: `${subject}`,
          toEmail: `${toEmail}`,
          body: `${body}`,
        });
      }
      
    }
    const response = await fetch(sendMethodServerUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: responseBody,
    });
    const serverResponse = await response.json();
    delete serverResponse['fromEmail']
    return serverResponse;
  } else {
    return{
      message:"serverUnderMaintenance"
    }
  }
}

module.exports = emailservice;