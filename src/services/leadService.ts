export interface LeadData {
  formType: 'Contact Form' | 'Service Booking Modal' | string;
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

const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycby06_1yr6yoUot8Y_buKGGTMTfLVjNQvro8Icdfjb1-iNXMXjQgXHgICUuNVgFAELXQ/exec';

/**
 * Submit lead details to Google Sheets Webhook (Apps Script Web App).
 * Uses text/plain and no-cors mode to safely send data across origins without triggering CORS preflight blocks.
 */
export async function submitLeadToSheet(data: LeadData): Promise<SubmitResult> {
  const envUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;
  const webhookUrl =
    (envUrl && envUrl.trim() && !envUrl.includes('YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL'))
      ? envUrl.trim()
      : DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;

  try {
    const payload = {
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      formType: data.formType,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      service: data.service || 'General Vedic Consultation',
      message: data.message || '',
    };

    // Google Apps Script Web Apps require simple request with stringified body
    // 'text/plain;charset=utf-8' prevents OPTIONS preflight, avoiding CORS blocks
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
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
