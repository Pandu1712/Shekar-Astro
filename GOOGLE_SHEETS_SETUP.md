# 📊 Google Sheets (Excel) Integration Guide

This guide explains how to link the **Contact Form** and **Service Booking Modal** to an online Google Sheet (live Excel sheet) for Master Shekar Ji.

---

## 🌟 Step 1: Create the Google Sheet

1. Open your browser and go to [sheets.new](https://sheets.new) (or Google Drive → New → Google Sheets).
2. Name the sheet: **`Master Shekar Ji - Leads & Enquiries`**.
3. In the first row (`Row 1`), enter these column headers:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| **Timestamp** | **Form Type** | **Name** | **Email** | **Phone** | **Service** | **Message / Details** |

---

## ⚙️ Step 2: Add Google Apps Script

1. In the Google Sheet top menu, click **Extensions** → **Apps Script**.
2. Erase any code inside `Code.gs` and replace it with this exact script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);
    
    var timestamp = data.timestamp || new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    var formType = data.formType || "Website Lead";
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var service = data.service || "";
    var message = data.message || "";
    
    // Append the lead to the spreadsheet
    sheet.appendRow([
      timestamp,
      formType,
      name,
      email,
      phone,
      service,
      message
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Press **Ctrl + S** (or click the 💾 Save icon).

---

## 🚀 Step 3: Deploy as a Web App

1. In the top right corner of Apps Script, click **Deploy** → **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* and choose **Web app**.
3. Fill in these settings:
   - **Description**: `Shekar Astro Form Submissions`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(⚠️ Crucial: must be "Anyone" so the website can submit leads without requiring login)*
4. Click **Deploy**.
5. If Google asks to *Authorize access*:
   - Click **Authorize access** → select your Google account.
   - Click **Advanced** (bottom left) → **Go to Untitled project (unsafe)**.
   - Click **Allow**.
6. **Copy the Web app URL** (looks like: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 🔗 Step 4: Add URL to the Project

Open the `.env` file in the project and paste the URL:

```env
VITE_GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
```

Save the file and restart the development server (`npm run dev`) or re-build!

---

## 📥 How the Client Can Access the Excel Sheet

1. **Live Browser**: Simply open the Google Sheet link on any PC, iPad, or mobile phone.
2. **Offline Excel (.xlsx)**:
   - Click **File** → **Download** → **Microsoft Excel (.xlsx)**.
   - A standard `.xlsx` file will be downloaded to their computer.
3. **Mobile App**:
   - Download the free **Google Sheets** app from Play Store or App Store to view incoming leads anytime on the go!
