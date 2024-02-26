function bookingSuccessEmailDoctor(doctorname, patientname, date, time) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1, h2 {
            color: #333;
            margin-top: 0;
        }
        p {
            color: #666;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
        }
    </style>
    </head>
    <body>
    <div class="container">
    <img src="https://medinscare.s3.ap-south-1.amazonaws.com/hospitalNewsImages/logo.png" alt="Doccure Logo" style="max-width: 100%; height: auto; margin-bottom: 20px;">
        <h1>New Booking Notification</h1>
        <p>Hello Dr. ${doctorname},</p>
        <p>You have a new booking from ${patientname} scheduled for:</p>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>Please review the details and update your schedule accordingly.</p>
        <p>Thank you,</p>
        <p>Team Doccure</p>
    </div>
    </body>
    </html>
    `;
}

function bookingSuccessEmailUser(doctorname, patientname, date, time) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1, h2 {
            color: #333;
            margin-top: 0;
        }
        p {
            color: #666;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
        }
    </style>
    </head>
    <body>
    <div class="container">
    <img src="https://medinscare.s3.ap-south-1.amazonaws.com/hospitalNewsImages/logo.png" alt="Doccure Logo" style="max-width: 100%; height: auto; margin-bottom: 20px;">
        <h1>Booking Confirmation</h1>
        <p>Hello ${patientname},</p>
        <p>Your booking with Dr. ${doctorname} has been confirmed:</p>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>We look forward to seeing you at the appointment.</p>
        <p>Thank you for choosing our medical practice.</p>
        <p>Best regards,</p>
        <p>Team Doccure</p>
    </div>
    </body>
    </html>
    `;
}

function passwordResetEmail(name, resetLink) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1, h2 {
            color: #333;
            margin-top: 0;
        }
        p {
            color: #666;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
        }
    </style>
    </head>
    <body>
    <div class="container">
    <img src="https://medinscare.s3.ap-south-1.amazonaws.com/hospitalNewsImages/logo.png" alt="Doccure Logo" style="max-width: 100%; height: auto; margin-bottom: 20px;">
        <h1>Password Reset</h1>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. Click the button below to reset your password:</p>
        <a href="${resetLink}" class="button">Reset Password</a>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Thank you,</p>
        <p>Team Doccure</p>
    </div>
    </body>
    </html>
    `;
}

function userQueryEmail(name, email, message) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Query</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1, h2 {
            color: #333;
            margin-top: 0;
        }
        p {
            color: #666;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
        }
    </style>
    </head>
    <body>
    <div class="container">
    <img src="https://medinscare.s3.ap-south-1.amazonaws.com/hospitalNewsImages/logo.png" alt="Doccure Logo" style="max-width: 100%; height: auto; margin-bottom: 20px;">
        <h1>New Query</h1>
        <p>Hello,</p>
        <p>You have received a new query from your patient ${name}:</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        <p>Please respond to the user as soon as possible.</p>
        <p>Thank you,</p>
        <p>Team Doccure</p>
    </div>
    </body>
    </html>
    `;
}

function prescriptionEmail(doctorname,patientname, prescriptions) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Prescription</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1, h2 {
            color: #333;
            margin-top: 0;
        }
        p {
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <img src="https://medinscare.s3.ap-south-1.amazonaws.com/hospitalNewsImages/logo.png" alt="Doccure Logo" style="max-width: 100%; height: auto; margin-bottom: 20px;">
        <h1>New Prescription</h1>
        <p>Hello ${patientname},</p>
        <p>You have received a new prescription from Dr. ${doctorname}:</p>
        <table>
            <thead>
                <tr>
                    <th>Medicine</th>
                    <th>Number of Days</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                </tr>
            </thead>
            <tbody>
                ${prescriptions.map(prescription => `
                    <tr>
                        <td>${prescription.medicine}</td>
                        <td>${prescription.noofdays}</td>
                        <td>${prescription.dosage}</td>
                        <td>${prescription.frequency}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <p>Please follow the prescription as directed by your doctor.</p>
        <p>Thank you,</p>
        <p>Team Doccure</p>
    </div>
    </body>
    </html>
    `;
}




export { bookingSuccessEmailDoctor, bookingSuccessEmailUser, passwordResetEmail, userQueryEmail, prescriptionEmail};


