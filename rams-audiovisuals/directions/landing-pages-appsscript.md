function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // ==========================================
  // 1. PREMIUM SHEET CREATION & FORMATTING
  // ==========================================
  if (sheet.getLastRow() === 0) {
    var headers = ['Timestamp', 'Name', 'Number', 'Source'];
    sheet.appendRow(headers);
    
    // Apply a clean, high-end look to the header row
    var headerRange = sheet.getRange(1, 1, 1, 4);
    headerRange.setFontWeight("bold")
               .setBackground("#0f172a") // Professional dark navy background
               .setFontColor("#ffffff")  // Clean white text
               .setHorizontalAlignment("center");
               
    sheet.setFrozenRows(1);
    
    // Widen the columns slightly so the data has room to breathe
    sheet.setColumnWidths(1, 4, 160); 
  }
  
  // ==========================================
  // 2. EXTRACT INCOMING DATA
  // ==========================================
  // We use || "N/A" as a fallback just in case a field comes in completely empty
  var name   = e.parameter.Name || "N/A";
  var number = e.parameter.Number || "N/A";
  var source = e.parameter.Source || "No source provided"; 
  
  // Push the new lead into the Google Sheet
  sheet.appendRow([new Date(), name, number, source]);
  
  // ==========================================
  // 3. DYNAMIC EMAIL ROUTING (MULTI-CITY)
  // ==========================================
  // The main client who MUST receive every single lead
  var mainClientEmail = "manjrekarnikhil619@gmail.com";
  
  // We will store the city manager's email here once we figure out which city it is
  var cityManagerEmail = "";
  
  // Convert the source to lowercase so that "Pune", "PUNE", and "pune" all match correctly
  var sourceLower = source.toLowerCase();

  // Check the source field and assign the correct local manager
  if (sourceLower.includes("hyderabad")) {
    cityManagerEmail = "sumithnalla0607@gmail.com";
  } 
  else if (sourceLower.includes("mumbai")) {
    cityManagerEmail = "sumithofficial2@gmail.com";
  } 
  else if (sourceLower.includes("bangalore") || sourceLower.includes("bengaluru")) { // Catching both spellings just in case!
    cityManagerEmail = "hoosier.daddy69xxx@gmail.com";
  } 
  else if (sourceLower.includes("chennai")) {
    cityManagerEmail = "studyjeemletscrackit@gmail.com";
  } 
  else if (sourceLower.includes("pune")) {
    cityManagerEmail = "sumithnalla24@ifheindia.org";
  }

  // Combine the emails. It starts with Nikhil, and if a city manager was found, we add a comma and their email.
  var finalRecipientList = mainClientEmail;
  if (cityManagerEmail !== "") {
    finalRecipientList += "," + cityManagerEmail;
  }

  // ==========================================
  // 4. PREMIUM HTML EMAIL TEMPLATE
  // ==========================================
  var subject = "New Lead Alert | " + name;
  
  // This HTML is designed to look clean, minimalist, and highly professional on both desktop and mobile.
  var htmlBody = 
    "<div style='font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;'>" +
      "<div style='max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;'>" +
        
        // Header block
        "<div style='background-color: #0f172a; padding: 24px; text-align: center; border-bottom: 4px solid #0ea5e9;'>" +
          "<h2 style='color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;'>New Lead Received</h2>" +
        "</div>" +
        
        // Content block
        "<div style='padding: 32px;'>" +
          "<p style='color: #475569; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 24px;'>A new lead has been submitted. Here are the captured details:</p>" +
          
          // Data Table
          "<table style='width: 100%; border-collapse: collapse;'>" +
            "<tr>" +
              "<td style='padding: 14px 16px; background-color: #f1f5f9; color: #334155; font-weight: 600; width: 30%; border-radius: 8px 0 0 0;'>Name</td>" +
              "<td style='padding: 14px 16px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500; font-size: 16px;'>" + name + "</td>" +
            "</tr>" +
            "<tr>" +
              "<td style='padding: 14px 16px; background-color: #f1f5f9; color: #334155; font-weight: 600;'>Number</td>" +
              "<td style='padding: 14px 16px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500; font-size: 16px;'>" + number + "</td>" +
            "</tr>" +
            "<tr>" +
              "<td style='padding: 14px 16px; background-color: #f1f5f9; color: #334155; font-weight: 600; border-radius: 0 0 0 8px;'>Source</td>" +
              "<td style='padding: 14px 16px; color: #0ea5e9; font-weight: 600; font-size: 15px;'>" + source + "</td>" +
            "</tr>" +
          "</table>" +
        "</div>" +
        
        // Footer block
        "<div style='background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;'>" +
          "<p style='color: #64748b; font-size: 12px; margin: 0; font-weight: 500;'>Automated Lead Routing System</p>" +
        "</div>" +
        
      "</div>" +
    "</div>";
  
  // Send the actual email
  GmailApp.sendEmail(finalRecipientList, subject, "", { htmlBody: htmlBody });
  
  // ==========================================
  // 5. RETURN SUCCESS TO FRONTEND
  // ==========================================
  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}