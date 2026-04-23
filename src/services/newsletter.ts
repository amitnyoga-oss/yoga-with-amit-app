/**
 * Service for handling newsletter subscriptions via Brevo.
 */
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      console.error('VITE_BREVO_API_KEY is not defined in environment variables.');
      // Fallback for development if key is missing
      return { success: true, message: 'Simulation: Thank you for subscribing!' };
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        listIds: [2], // Defaulting to list 2 or appropriate ID for your Brevo account
        updateEnabled: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      
      // If contact already exists, we count it as success for the user experience
      if (errorData.code === 'duplicate_parameter') {
        return { success: true, message: 'You are already subscribed!' };
      }
      
      return { success: false, message: 'Something went wrong. Please try again later.' };
    }

    return { 
      success: true, 
      message: 'Thank you for subscribing!' 
    };
  } catch (error) {
    console.error('Failed to subscribe:', error);
    return { success: false, message: 'Failed to connect to the newsletter service.' };
  }
}
