const sgmail = require('@sendgrid/mail')



sgmail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeMail = (email, name)=>{
    sgmail.send({
        to: email,
        from: 'vivek.kovur@gmail.com',
        subject: 'send welcome mail',
        text:`Hi ${name}, how are you doing?`
    })

} 

const sendCancellationMail = (email, name)=>{
    sgmail.send({
        to: email,
        from: 'vivek.kovur@gmail.com',
        subject: 'send cancellation mail',
        text:`Hi ${name}, is there anything to make you stay from our service`
    })

}

module.exports = {
    sendWelcomeMail, sendCancellationMail
}
