# 📱 Apple Shortcut Budget Tracker Setup

This guide will help you set up a personal budget tracker that uses an iPhone Shortcut to send data to a Google Sheet.

## 1. Google Sheets Setup
1.  Create a new **Google Sheet** (e.g., named "My Budget").
2.  Go to **Extensions** > **Apps Script**.
3.  Delete any code in the `Code.gs` file and **paste the content of `budget_script.js`** (from this project) into it.
4.  Click the **Save** icon (floppy disk).
5.  Click **Deploy** (blue button top right) > **New deployment**.
6.  Click the **Select type** gear icon > **Web app**.
7.  Fill in the details:
    *   **Description**: Budget Tracker API
    *   **Execute as**: Me (your email)
    *   **Who has access**: **Anyone** (This is important so the Shortcut can access it without complex auth. Since the URL is secret, it's relatively safe for personal use).
8.  Click **Deploy**.
9.  **Copy the Web App URL** (it ends in `/exec`). You will need this for the Shortcut.

## 2. iPhone Shortcut Setup
1.  Open the **Shortcuts** app on your iPhone.
2.  Tap **+** to create a new shortcut.
3.  **Add the following actions:**

    *   **Ask for Input**: Ask for `Text` with prompt "What did you buy?" (Rename variable to `Item`).
    *   **Ask for Input**: Ask for `Number` with prompt "How much?" (Rename variable to `Amount`).
    *   **Choose from Menu**: Prompt "Category?", Options: "Food", "Transport", "Bills", "Entertainment", etc. (Save result to variable `Category`).
    *   **Ask for Input**: Ask for `Text` with prompt "Notes?" (Rename variable to `Notes`).
    *   **URL**: Paste your **Web App URL** from step 1.
    *   **Get Contents of URL**:
        *   Expand the arrow (>) next to the URL action.
        *   **Method**: POST
        *   **Headers**: Add new header `Content-Type` : `application/json`
        *   **Request Body**: JSON
        *   **Add Fields**:
            *   `item`: (Select `Item` variable)
            *   `amount`: (Select `Amount` variable)
            *   `category`: (Select `Category` variable)
            *   `notes`: (Select `Notes` variable)
            *   `date`: (Current Date)
    *   **Show Notification**: "Expense added!" (Optional)

4.  Name the shortcut (e.g., "Add Expense") and add it to your Home Screen for quick access.

## 3. Usage
1.  Tap the shortcut.
2.  Enter the item, amount, and category.
3.  Check your Google Sheet—the row should appear automatically!
