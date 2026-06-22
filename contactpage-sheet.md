url of sheets = https://script.google.com/macros/s/AKfycbxHos0F8836zP2NpBGvb6GmmI8l08u7kc1oU3Nqa9eNuVSFLAQo_xI-Hq2GwDHl3mdLGA/exec

code used to create sheet for contact page form:

    function doPost(e) {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // ==========================================
        // 1. PREMIUM SHEET CREATION & FORMATTING
        // ==========================================
        // This automatically runs on the very first submission to set up the headers
        if (sheet.getLastRow() === 0) {
            var headers = ['Timestamp', 'Name', 'Email', 'Phone', 'City', 'Message'];
            sheet.appendRow(headers);

            // Apply a clean, high-end look to the header row
            var headerRange = sheet.getRange(1, 1, 1, 6);
            headerRange.setFontWeight("bold")
                .setBackground("#0f172a") // Professional dark navy background
                .setFontColor("#ffffff")  // Clean white text
                .setHorizontalAlignment("center");

            sheet.setFrozenRows(1);

            // Widen the columns slightly so the data has room to breathe
            sheet.setColumnWidths(1, 6, 160);
        }

        // ==========================================
        // 2. EXTRACT INCOMING DATA
        // ==========================================
        // Using || "N/A" ensures the script doesn't break if a user leaves an optional field blank
        var name = e.parameter.Name || "N/A";
        var email = e.parameter.Email || "N/A";
        var phone = e.parameter.Phone || "N/A";
        var city = e.parameter.City || "N/A";
        var message = e.parameter.Message || "No message provided";

        // Push the new lead into the Google Sheet
        sheet.appendRow([new Date(), name, email, phone, city, message]);

        // ==========================================
        // 3. PREMIUM HTML EMAIL TEMPLATE
        // ==========================================
        var clientEmail = "sumithnalla0607@gmail.com";

        // Including the city and name in the subject line makes it easy for Nikhil to scan his inbox
        var subject = "New Website Enquiry | " + name + " (" + city + ")";

        // This HTML is designed to look clean, minimalist, and highly professional on both desktop and mobile.
        var htmlBody =
            "<div style='font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;'>" +
            "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;'>" +

            // Header block
            "<div style='background-color: #2563eb; padding: 24px; text-align: center; border-bottom: 4px solid #1d4ed8;'>" +
            "<h2 style='color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;'>New Website Enquiry</h2>" +
            "</div>" +

            // Content block
            "<div style='padding: 32px;'>" +
            "<p style='color: #475569; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 24px;'>You have received a new message from the main website contact form. Here are the details:</p>" +

            // Data Table
            "<table style='width: 100%; border-collapse: collapse;'>" +
            "<tr>" +
            "<td style='padding: 14px 16px; background-color: #f1f5f9; color: #334155; font-weight: 600; width: 30%; border-radius: 8px 0 0 0;'>Name</td>" +
            "<td style='padding: 14px 16px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500; font-size: 16px;'>" + name + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td style='padding: 14px 16px; background-color: #f1f5f9; color: #334155; font-weight: 600;'>Email</td>" +
            "<td style='padding: 14px 16px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500; font-size: 16px;'><a href='mailto:" + email + "' style='color: #2563eb; text-decoration: none;'>" + email + "</a></td>" +
            "</tr>" +
            "<tr>" +
            "<td style='padding: 14px 16px; background-color: #f1f5f9; color: #334155; font-weight: 600;'>Phone</td>" +
            "<td style='padding: 14px 16px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500; font-size: 16px;'>" + phone + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td style='padding: 14px 16px; background-color: #f1f5f9; color: #334155; font-weight: 600;'>City</td>" +
            "<td style='padding: 14px 16px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500; font-size: 16px;'>" + city + "</td>" +
            "</tr>" +
            "<tr>" +
            // vertical-align: top helps if the message is a long paragraph
            "<td style='padding: 14px 16px; background-color: #f1f5f9; color: #334155; font-weight: 600; border-radius: 0 0 0 8px; vertical-align: top;'>Message</td>" +
            "<td style='padding: 14px 16px; color: #0f172a; font-weight: 500; font-size: 15px; line-height: 1.5; white-space: pre-wrap;'>" + message + "</td>" +
            "</tr>" +
            "</table>" +
            "</div>" +

            // Footer block
            "<div style='background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;'>" +
            "<p style='color: #64748b; font-size: 12px; margin: 0; font-weight: 500;'>Automated Website Lead System</p>" +
            "</div>" +

            "</div>" +
            "</div>";

        // Send the actual email
        GmailApp.sendEmail(clientEmail, subject, "", { htmlBody: htmlBody });

        // ==========================================
        // 4. RETURN SUCCESS TO FRONTEND
        // ==========================================
        return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);
    }