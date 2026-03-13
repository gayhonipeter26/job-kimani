import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, phone, role, residence } = req.body;

  if (!name || !phone || !role || !residence) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const webhookUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;

    if (!webhookUrl) {
       console.log('Skipping Google Sheets append because Webhook URL is not configured. Logging locally instead:');
       console.log({ name, phone, role, residence, timestamp: new Date() });
       return res.status(200).json({ success: true, message: 'Volunteer saved successfully (local mock)' });
    }

    // Forward the data to the Google Apps Script Webhook using Axios
    // Axios safely handles the 302 redirects that Google Apps Script often uses
    const response = await axios.post(webhookUrl, {
      name,
      phone,
      role,
      residence,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.data && response.data.status === 'error') {
      throw new Error(`Google Script returned error: ${response.data.message}`);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Volunteer data securely added via Webhook.' 
    });

  } catch (error) {
    console.error('Error recording volunteer:', error);
    return res.status(500).json({ 
      message: 'Failed to save data',
      error: error.toString() || error.message || 'Unknown error occurred'
    });
  }
}

