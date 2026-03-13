export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, phone, role, residence } = req.body;

  if (!name || !phone || !role || !residence) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // We are now using a Google Apps Script Webhook instead of Service Account Keys
    const webhookUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;

    if (!webhookUrl) {
       console.log('Skipping Google Sheets append because Webhook URL is not configured. Logging locally instead:');
       console.log({ name, phone, role, residence, timestamp: new Date() });
       return res.status(200).json({ success: true, message: 'Volunteer saved successfully (local mock)' });
    }

    // Forward the data to the Google Apps Script Webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        role,
        residence,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Script responded with status: ${response.status}`);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Volunteer data securely added via Webhook.' 
    });

  } catch (error) {
    console.error('Error recording volunteer:', error);
    return res.status(500).json({ message: 'Failed to save data. Please check configuration.' });
  }
}
