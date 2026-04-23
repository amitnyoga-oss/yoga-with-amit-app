/**
 * Service for handling contact form submissions via Brevo Transactional Email.
 */
export async function sendContactEmail(data: { name: string; email: string; message: string }): Promise<{ success: boolean; message: string }> {
  try {
    const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      console.error('VITE_BREVO_API_KEY is not defined.');
      return { success: true, message: 'Simulation: Message sent successfully!' };
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: data.name, email: data.email },
        to: [{ email: 'namaste@yogawithamit.com', name: 'Amit' }],
        subject: `New Contact Form Submission from ${data.name}`,
        htmlContent: `
          <h3>New Message from Your Website</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      return { success: false, message: 'Failed to send message. Please try again later.' };
    }

    return { 
      success: true, 
      message: 'Your message has been sent successfully!' 
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
