function doPost(e) {
    try {
        // 1. Get the sheet
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = ss.getSheetByName('Expenses');

        // Create 'Expenses' sheet if it doesn't exist
        if (!sheet) {
            sheet = ss.insertSheet('Expenses');
            // Add headers
            sheet.appendRow(['Date', 'Item', 'Category', 'Amount', 'Notes']);
            // Freeze the header row
            sheet.setFrozenRows(1);
        }

        // 2. Parse the incoming JSON data
        var data = JSON.parse(e.postData.contents);

        // 3. Prepare the row data
        // Expecting JSON: { "date": "YYYY-MM-DD", "item": "Coffee", "category": "Food", "amount": 5.00, "notes": "Starbucks" }
        var row = [
            data.date || new Date(), // Use provided date or current timestamp
            data.item,
            data.category,
            data.amount,
            data.notes
        ];

        // 4. Append to the sheet
        sheet.appendRow(row);

        // 5. Return success
        return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error
        return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() })).setMimeType(ContentService.MimeType.JSON);
    }
}
