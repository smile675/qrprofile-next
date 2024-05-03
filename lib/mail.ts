import nodemailer from 'nodemailer';

export const sendVerificationEmail = async(
    email: string,
    token: string,
)=>{
    const verifcaitonLink = `http://localhost:3000/email-verification?token=${token}`;

      // Create a nodemailer transporter using SMTP details
        let transporter = nodemailer.createTransport({
            host: "smtp.titan.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
            },
        });


    // Send email
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `<p>Please click the following link to verify your email: <a href="${verifcaitonLink}">Verify Email</a></p>`,
    });

}


export const sendPasswordResetEmail = async(
    email: string,
    token: string,
)=>{
    const resetLink = `http://localhost:3000/new-password?token=${token}`;

      // Create a nodemailer transporter using SMTP details
        let transporter = nodemailer.createTransport({
            host: "smtp.titan.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
            },
        });


    // Send email
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset your password',
        html: `<p>Please click the following link to reset your password: <a href="${resetLink}">Reset Passowrd</a></p>`,
    });

}