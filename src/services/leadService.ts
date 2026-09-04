export interface LeadData {
  formType: 'Contact Form' | 'Service Booking Modal';
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
}

export interface SubmitResult {
  success: boolean;
  message?: string;
}

/**
 * Submit lead details to Google Sheets Webhook.
 * Handles CORS and no-cors mode gracefully for Google Apps Script Web Apps.
 */
export async function submitLeadToSheet(data: LeadData): Promise<SubmitResult> {
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;

  // If no webhook URL is configured yet, log warning and simulate successful submission in development
  if (!webhookUrl || webhookUrl.trim() === '' || webhookUrl.includes('YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL')) {
    console.warn(
      '[LeadService] VITE_GOOGLE_SHEET_WEBHOOK_URL is not configured yet. Form data was not sent to Google Sheets:',
      data
    );
    // Return success in preview/dev so the UI user flow succeeds
    return {
      success: true,
      message: 'Demo mode: Please configure VITE_GOOGLE_SHEET_WEBHOOK_URL in .env to save to real Google Sheet.',
    };
  }

  try {
    // Google Apps Script Web Apps require POST with stringified JSON or URLSearchParams.
    // Using standard fetch with no-cors or JSON body:
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // Essential for Google Apps Script redirect handling without CORS blocks
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString(),
        ...data,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error('[LeadService] Failed to submit lead to Google Sheet:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit form',
    };
  }
}
