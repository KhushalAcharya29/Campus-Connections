import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract the recipient email from the request body (optional if dynamic)
    const { recipientEmail } = req.body;

    // Set up the email transporter with environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,  // Your email from env
        pass: process.env.EMAIL_PASSWORD,  // Your email password from env
      },
    });

    // Define mail options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // Your email
      to: recipientEmail || 'recipient@example.com', // Recipient email
      subject: 'Test Email',
      text: 'This is a test email.',
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Test email sent:', info.response);

      // Respond with success
      res.status(200).json({ message: 'Email sent successfully', info: info.response });
    } catch (error) {
      console.error('Error sending test email:', error);
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    // Handle any non-POST request
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
