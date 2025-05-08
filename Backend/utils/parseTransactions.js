// // backend/utils/parseTransactions.js

// // Parses “<amount> on <keyword>” and assigns categories via keyword lookup.
// export function parseAndCategorize(text) {
//   const regex = /(\d+(?:\.\d{1,2})?)\s+on\s+([A-Za-z]+)/g;
//   const dict = {
//     Food: ["food", "restaurant", "dinner", "lunch", "cafe", "grocery"],
//     Clothes: ["clothes", "fashion", "shirt", "pants", "mall", "boutique"],
//     Transport: ["taxi", "uber", "bus", "train", "fuel", "gas"],
//     Entertainment: ["movie", "concert", "netflix", "game"],
//     // …add more categories here
//   };

//   const results = [];
//   let match;
//   while ((match = regex.exec(text)) !== null) {
//     const amount = parseFloat(match[1]);
//     const raw = match[2];
//     const key = raw.toLowerCase();
//     let category = "Others";

//     for (const [cat, keywords] of Object.entries(dict)) {
//       if (keywords.some((k) => key.includes(k))) {
//         category = cat;
//         break;
//       }
//     }

//     results.push({
//       amount,
//       category,
//       store: raw,
//       date: new Date().toISOString(),
//     });
//   }

//   return results;
// }
// backend/utils/parseTransactions.js
export function parseAndCategorize(text) {
  const regex = /(\d+(?:\.\d{1,2})?)\s+on\s+([A-Za-z]+)/g;
  const dict = {
    Food: ["food", "restaurant", "dinner", "lunch", "cafe", "grocery"],
    Clothes: ["clothes", "fashion", "shirt", "pants", "mall", "boutique"],
    Transport: ["taxi", "uber", "bus", "train", "fuel", "gas"],
    Entertainment: ["movie", "concert", "netflix", "game"],
  };

  const results = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const amount = parseFloat(match[1]);
    const raw = match[2];
    const key = raw.toLowerCase();
    let category = "Others";

    for (const [cat, keywords] of Object.entries(dict)) {
      if (keywords.some((k) => key.includes(k))) {
        category = cat;
        break;
      }
    }

    results.push({
      amount,
      category,
      store: raw,
      date: new Date().toISOString(),
    });
  }

  return results;
}
