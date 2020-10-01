const axios = require('axios')
const moment = require("moment")

const sendEmail =  async (email, name) => {
  try {
    await axios({
      method: 'post',
      url: 'https://api.sendgrid.com/v3/mail/send',
      headers: { 
        'Authorization' : `Bearer ${process.env.SENDGRID_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        "personalizations": [
          {
            "to": [
              {
                "email": `${email}`
              }
            ],
            "subject": `${name} Your Account Has Been Created`,
          }
        ],
        "from": {
          "email": "ramzyshopapp@gmail.com"
        },
        "content": [
          {
            "type": "text/plain",
            "value": `Hello ${name}, Welcome to My Game Catalogue`
          }
        ]
      }
    });
  } catch (err) {
    console.log("Email mungkin tidak ada")
  }
}

module.exports = { sendEmail }