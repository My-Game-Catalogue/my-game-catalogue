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
            "type": "text/html",
            "value": `
              <h2>Hello ${name}, Welcome to My Game Catalogue</h2>
              <img src="https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80">
            `
          }
        ]
      }
    });
  } catch (err) {
    console.log("Email mungkin tidak ada")
  }
}

module.exports = { sendEmail }