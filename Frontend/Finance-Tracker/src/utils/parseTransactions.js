/**
 * Parse and categorize transaction text into structured data
 * @param {string} text - Raw text containing transaction descriptions
 * @returns {Array<Object>} Array of parsed transactions
 */
export function parseAndCategorizeText(text) {
  if (!text) return [];

  // Split into lines and filter out empty ones
  const lines = text.split("\n").filter((line) => line.trim());

  return lines.map((line) => {
    const words = line.toLowerCase().trim().split(/\s+/);
    let type = "expense"; // Default type
    let amount = 0;
    let category = "";
    let store = "";

    // Find amount - look for first number
    for (let i = 0; i < words.length; i++) {
      const num = parseFloat(words[i].replace(/[^0-9.]/g, ""));
      if (!isNaN(num)) {
        amount = num;
        // Check if this is income by looking at surrounding words
        if (
          i > 0 &&
          ["from", "received", "earned", "salary", "income"].includes(
            words[i - 1]
          )
        ) {
          type = "income";
        }
        break;
      }
    }

    // Basic category detection for expenses
    if (type === "expense") {
      if (line.match(/food|meal|lunch|dinner|breakfast|restaurant|cafe/i)) {
        category = "Food";
      } else if (line.match(/grocery|groceries|supermarket/i)) {
        category = "Groceries";
      } else if (line.match(/transport|uber|taxi|bus|train|metro/i)) {
        category = "Transport";
      } else if (line.match(/movie|entertainment|game|netflix/i)) {
        category = "Entertainment";
      } else if (line.match(/bill|utility|electricity|water|gas/i)) {
        category = "Bills";
      } else {
        category = "Other";
      }
    }

    // Extract store/description - take words after "at", "from", "to", "for", or after the amount
    const markers = ["at", "from", "to", "for", "on"];
    let storeWords = [];
    let foundMarker = false;

    for (let i = 0; i < words.length; i++) {
      if (markers.includes(words[i])) {
        foundMarker = true;
        continue;
      }
      if (foundMarker) {
        storeWords.push(words[i]);
      }
    }

    // If no marker found, take words after the amount
    if (!storeWords.length) {
      const amountIndex = words.findIndex(
        (w) => !isNaN(parseFloat(w.replace(/[^0-9.]/g, "")))
      );
      if (amountIndex >= 0) {
        storeWords = words
          .slice(amountIndex + 1)
          .filter((w) => !markers.includes(w));
      }
    }

    store = storeWords
      .join(" ")
      .replace(/[,.!?]$/, "") // Remove trailing punctuation
      .trim();

    // Capitalize first letter of store
    store = store.charAt(0).toUpperCase() + store.slice(1);

    return {
      type,
      amount,
      category,
      store,
      date: new Date().toISOString().split("T")[0], // Today's date
    };
  });
}
