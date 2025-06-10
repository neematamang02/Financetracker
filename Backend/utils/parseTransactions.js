// const STOP_WORDS = new Set([
//   "the",
//   "and",
//   "for",
//   "to",
//   "a",
//   "an",
//   "of",
//   "in",
//   "on",
//   "at",
//   "by",
//   "with",
//   "from",
// ]);

// const EXPENSE_TRIGGERS = new Set(["spent", "buy", "paid", "purchase", "on"]);
// const INCOME_TRIGGERS = new Set([
//   "from",
//   "got",
//   "earned",
//   "received",
//   "credit",
// ]);

// const EXPENSE_DICT = {
//   Food: ["food", "grocery", "restaurant", "cafe", "dinner", "lunch"],
//   Clothes: ["clothes", "fashion", "mall", "boutique", "shirt", "pants"],
//   Furniture: ["furniture", "sofa", "table", "chair", "bed"],
//   Transport: ["taxi", "uber", "bus", "train", "fuel", "gas"],
//   Entertainment: ["movie", "netflix", "concert", "game"],
//   Utilities: ["electricity", "water", "internet", "power", "bill"],
// };
// const INCOME_DICT = {
//   Salary: ["salary", "wages", "pay", "income"],
//   Gift: ["gift", "bonus", "present", "award"],
//   Refund: ["refund", "reimbursement"],
// };

// export function parseAndCategorizeText(text) {
//   const records = [];

//   // 1) Split into clauses (sentences) by punctuation or newlines
//   const clauses = text
//     .split(/[\r\n]+|[.;?!]+/)
//     .map((c) => c.trim())
//     .filter(Boolean);

//   // Helper: find which category keyword appears first (for store)
//   function findStoreKeyword(words, keywords) {
//     for (const w of words) {
//       if (keywords.includes(w)) {
//         return w;
//       }
//     }
//     return null;
//   }

//   clauses.forEach((clause) => {
//     const lc = clause.toLowerCase();

//     // 2) Find all numeric amounts in this clause
//     const amtRegex = /\b(\d+(?:\.\d{1,2})?)\b/g;
//     let match;
//     const amounts = [];
//     while ((match = amtRegex.exec(lc)) !== null) {
//       amounts.push({
//         value: parseFloat(match[1]),
//         index: match.index,
//         length: match[1].length,
//       });
//     }
//     if (!amounts.length) return;

//     // 3) Count expense vs. income triggers once per clause
//     let scoreExp = 0,
//       scoreInc = 0;
//     lc.split(/\s+/).forEach((w) => {
//       if (EXPENSE_TRIGGERS.has(w)) scoreExp++;
//       if (INCOME_TRIGGERS.has(w)) scoreInc++;
//     });
//     const type = scoreInc > scoreExp ? "income" : "expense";

//     // 4) For each amount, isolate its own context and category
//     amounts.forEach(({ value: amount, index, length }) => {
//       // 4a) Extract a rough “itemsPart” around this amount:
//       //     Try to find the last trigger word (“on” for expense or “from” for income) before this index
//       const splitKeyword = type === "expense" ? " on " : " from ";
//       let itemsPart = "";
//       const idxSplit = lc.lastIndexOf(splitKeyword, index);
//       if (idxSplit !== -1) {
//         // Everything after that “on” or “from”
//         itemsPart = lc.substring(idxSplit + splitKeyword.length).trim();
//       } else {
//         // Fallback: remove *this* numeric substring and use the rest
//         const before = clause.slice(0, index);
//         const after = clause.slice(index + length);
//         itemsPart = (before + " " + after).trim();
//       }

//       // 5) Split itemsPart on commas or “and” to handle multiple items
//       const rawItems = itemsPart
//         .split(/,|\band\b/)
//         .map((s) => s.trim())
//         .filter(Boolean);
//       if (!rawItems.length) {
//         rawItems.push(""); // ensure at least one pass
//       }

//       // 6) For each raw item, pick a category and a store keyword
//       rawItems.forEach((raw) => {
//         const dict = type === "expense" ? EXPENSE_DICT : INCOME_DICT;
//         // Remove stop words and split into tokens
//         const words = raw
//           .toLowerCase()
//           .split(/\s+/)
//           .filter((w) => !STOP_WORDS.has(w));

//         // 6a) Determine best category by counting keyword matches
//         let bestCat = type === "expense" ? "Others" : "Other Income";
//         let bestScore = 0;
//         Object.entries(dict).forEach(([cat, kws]) => {
//           const score = words.reduce(
//             (acc, w) => acc + (kws.includes(w) ? 1 : 0),
//             0
//           );
//           if (score > bestScore) {
//             bestScore = score;
//             bestCat = cat;
//           }
//         });

//         // 6b) Determine store: pick the first matching keyword from that category; else fallback to category name
//         const catKeywords = dict[bestCat] || [];
//         const storeKeyword = findStoreKeyword(words, catKeywords);
//         const store = storeKeyword || bestCat;

//         records.push({
//           type,
//           amount,
//           category: bestCat,
//           store,
//           date: new Date().toISOString(),
//         });
//       });
//     });
//   });

//   return records;
// }

// File: src/utils/parseTransactions.js

// File: src/utils/parseTransactions.js

// Stop‐words that we ignore when picking up category/store keywords:
// const STOP_WORDS = new Set([
//   "the",
//   "and",
//   "for",
//   "to",
//   "a",
//   "an",
//   "of",
//   "in",
//   "on",
//   "at",
//   "by",
//   "with",
//   "from",
// ]);

// // Trigger words used to guess expense vs. income:
// const EXPENSE_TRIGGERS = new Set(["spent", "buy", "paid", "purchase", "on"]);
// const INCOME_TRIGGERS = new Set([
//   "from",
//   "got",
//   "earned",
//   "received",
//   "credit",
// ]);

// // Keyword dictionary for picking an expense category:
// const EXPENSE_DICT = {
//   Food: ["food", "grocery", "restaurant", "cafe", "dinner", "lunch"],
//   Clothes: ["clothes", "fashion", "mall", "boutique", "shirt", "pants"],
//   Furniture: ["furniture", "sofa", "table", "chair", "bed"],
//   Transport: ["taxi", "uber", "bus", "train", "fuel", "gas"],
//   Entertainment: ["movie", "netflix", "concert", "game"],
//   Utilities: ["electricity", "water", "internet", "power", "bill"],
// };
// // Keyword dictionary for picking an income category:
// const INCOME_DICT = {
//   Salary: ["salary", "wages", "pay", "income"],
//   Gift: ["gift", "bonus", "present", "award"],
//   Refund: ["refund", "reimbursement"],
// };

// // Helper: pick the first matching keyword in `keywords` that appears in `words`
// function findStoreKeyword(words, keywords) {
//   for (const w of words) {
//     if (keywords.includes(w)) {
//       return w;
//     }
//   }
//   return null;
// }

// // Main parser function:
// export function parseAndCategorizeText(text) {
//   const records = [];

//   // 1) Split the input into "clauses" by punctuation or newlines:
//   //    (We will detect type at the clause level, then break the clause on "and".)
//   const clauses = text
//     .split(/[\r\n]+|[.;?!]+/)
//     .map((c) => c.trim())
//     .filter(Boolean);

//   clauses.forEach((clause) => {
//     const lcClause = clause.toLowerCase();

//     // ────────────────────────────────────────────────────────────────────────────
//     // 2) Determine type (expense vs. income) at the *clause* level,
//     //    by counting trigger words across the entire clause.
//     // ────────────────────────────────────────────────────────────────────────────
//     let scoreExpClause = 0,
//       scoreIncClause = 0;
//     lcClause.split(/\s+/).forEach((w) => {
//       if (EXPENSE_TRIGGERS.has(w)) scoreExpClause++;
//       if (INCOME_TRIGGERS.has(w)) scoreIncClause++;
//     });
//     const clauseType = scoreIncClause > scoreExpClause ? "income" : "expense";

//     // ────────────────────────────────────────────────────────────────────────────
//     // 3) Now split this clause on " and " (case‐insensitive),
//     //    so that "…3000 on food and 4000 on clothes" yields two sub‐clauses.
//     // ────────────────────────────────────────────────────────────────────────────
//     const subClauses = lcClause.split(/\s+and\s+/).map((s) => s.trim());

//     subClauses.forEach((sub) => {
//       // 4) In each sub‐clause, find the first numeric amount:
//       const amtMatch = sub.match(/\b(\d+(?:\.\d{1,2})?)\b/);
//       if (!amtMatch) return; // no numeric → skip

//       const amount = parseFloat(amtMatch[1]);

//       // 5) For itemsPart, look for "on " if expense or "from " if income,
//       //    otherwise fallback to removing the numeric substring.
//       let itemsPart = "";
//       if (clauseType === "expense") {
//         const idxOn = sub.indexOf("on ");
//         if (idxOn !== -1) {
//           itemsPart = sub.substring(idxOn + 3).trim();
//         } else {
//           // fallback: remove the numeric substring
//           itemsPart = sub.replace(amtMatch[1], "").trim();
//         }
//       } else {
//         // income:
//         const idxFrom = sub.indexOf("from ");
//         if (idxFrom !== -1) {
//           itemsPart = sub.substring(idxFrom + 5).trim();
//         } else {
//           itemsPart = sub.replace(amtMatch[1], "").trim();
//         }
//       }

//       // 6) Split itemsPart on commas (if any), otherwise treat as single item:
//       const rawItems = itemsPart
//         .split(/,/)
//         .map((s) => s.trim())
//         .filter(Boolean);
//       if (rawItems.length === 0) {
//         rawItems.push("");
//       }

//       rawItems.forEach((raw) => {
//         // 6a) Tokenize and remove stop‐words:
//         const words = raw
//           .split(/\s+/)
//           .map((w) => w.replace(/[^a-zA-Z0-9]/g, "")) // strip punctuation
//           .filter((w) => w && !STOP_WORDS.has(w));

//         // 6b) Pick best category from the appropriate dictionary:
//         const dict = clauseType === "expense" ? EXPENSE_DICT : INCOME_DICT;
//         let bestCat = clauseType === "expense" ? "Others" : "Other Income";
//         let bestScore = 0;
//         Object.entries(dict).forEach(([cat, kws]) => {
//           const score = words.reduce(
//             (acc, w) => acc + (kws.includes(w) ? 1 : 0),
//             0
//           );
//           if (score > bestScore) {
//             bestScore = score;
//             bestCat = cat;
//           }
//         });

//         // 6c) Pick a "store" keyword from that category if possible:
//         const catKeywords = dict[bestCat] || [];
//         const storeKeyword = findStoreKeyword(words, catKeywords);
//         const store = storeKeyword || bestCat;

//         // 6d) Push a single record with the *clause-level* type
//         records.push({
//           type: clauseType,
//           amount,
//           category: bestCat,
//           store,
//           date: new Date().toISOString(),
//         });
//       });
//     });
//   });

//   return records;
// }
// File: src/utils/parseTransactions.js

// ─────────────────────────────────────────────────────────────────────────────
// Stop‐words that we ignore when picking up category/store keywords:
// ─────────────────────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "to",
  "a",
  "an",
  "of",
  "in",
  "on",
  "at",
  "by",
  "with",
  "from",
]);

// ─────────────────────────────────────────────────────────────────────────────
// Now include “salary” and “bonus” (alongside "got", "earned", etc.) so that
// phrases like “salary of 20000” or “bonus of 10000” are detected as income.
// ─────────────────────────────────────────────────────────────────────────────
const EXPENSE_TRIGGERS = new Set(["spent", "buy", "paid", "purchase", "on"]);
const INCOME_TRIGGERS = new Set([
  "from",
  "got",
  "earned",
  "received",
  "credit",
  "salary", // ← newly added
  "bonus", // ← newly added
]);

// ─────────────────────────────────────────────────────────────────────────────
// Keyword dictionary for picking an expense category:
// ─────────────────────────────────────────────────────────────────────────────
const EXPENSE_DICT = {
  Food: ["food", "grocery", "restaurant", "cafe", "dinner", "lunch"],
  Clothes: ["clothes", "fashion", "mall", "boutique", "shirt", "pants"],
  Furniture: ["furniture", "sofa", "table", "chair", "bed"],
  Transport: ["taxi", "uber", "bus", "train", "fuel", "gas"],
  Entertainment: ["movie", "netflix", "concert", "game"],
  Utilities: ["electricity", "water", "internet", "power", "bill"],
};
// ─────────────────────────────────────────────────────────────────────────────
// Keyword dictionary for picking an income category:
// ─────────────────────────────────────────────────────────────────────────────
const INCOME_DICT = {
  Salary: ["salary", "wages", "pay", "income"],
  Gift: ["gift", "bonus", "present", "award"],
  Refund: ["refund", "reimbursement"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: pick the first matching keyword from `keywords` that appears in `words`
// ─────────────────────────────────────────────────────────────────────────────
function findStoreKeyword(words, keywords) {
  for (const w of words) {
    if (keywords.includes(w)) {
      return w;
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main parser function
// ─────────────────────────────────────────────────────────────────────────────
export function parseAndCategorizeText(text) {
  const records = [];

  // 1) Split input into clauses (by punctuation or newlines)
  const clauses = text
    .split(/[\r\n]+|[.;?!]+/)
    .map((c) => c.trim())
    .filter(Boolean);

  clauses.forEach((clause) => {
    const lcClause = clause.toLowerCase();

    // ────────────────────────────────────────────────────────────────────────────
    // 2) Decide “expense vs. income” *at the clause level* by counting triggers
    // ────────────────────────────────────────────────────────────────────────────
    let scoreExpClause = 0,
      scoreIncClause = 0;

    lcClause.split(/\s+/).forEach((w) => {
      if (EXPENSE_TRIGGERS.has(w)) scoreExpClause++;
      if (INCOME_TRIGGERS.has(w)) scoreIncClause++;
    });
    const clauseType = scoreIncClause > scoreExpClause ? "income" : "expense";

    // ────────────────────────────────────────────────────────────────────────────
    // 3) Split this clause on “ and ” so that multiple “and”-joined items
    //    become separate pieces. Each inherits the same clauseType.
    // ────────────────────────────────────────────────────────────────────────────
    const subClauses = lcClause.split(/\s+and\s+/).map((s) => s.trim());

    subClauses.forEach((sub) => {
      // 4) Find the first numeric amount in the sub‐clause
      const amtMatch = sub.match(/\b(\d+(?:\.\d{1,2})?)\b/);
      if (!amtMatch) return; // no number → skip

      const amount = parseFloat(amtMatch[1]);

      // 5) Extract the “itemsPart” (words after “on” if expense, “from” if income)
      let itemsPart = "";
      if (clauseType === "expense") {
        const idxOn = sub.indexOf("on ");
        if (idxOn !== -1) {
          itemsPart = sub.substring(idxOn + 3).trim();
        } else {
          itemsPart = sub.replace(amtMatch[1], "").trim();
        }
      } else {
        const idxFrom = sub.indexOf("from ");
        if (idxFrom !== -1) {
          itemsPart = sub.substring(idxFrom + 5).trim();
        } else {
          itemsPart = sub.replace(amtMatch[1], "").trim();
        }
      }

      // 6) Split itemsPart on commas (if any), otherwise single item
      const rawItems = itemsPart
        .split(/,/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (rawItems.length === 0) {
        rawItems.push("");
      }

      rawItems.forEach((raw) => {
        // 6a) Tokenize + strip punctuation + remove stop‐words
        const words = raw
          .split(/\s+/)
          .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
          .filter((w) => w && !STOP_WORDS.has(w));

        // 6b) Choose the best category from the appropriate dictionary
        const dict = clauseType === "expense" ? EXPENSE_DICT : INCOME_DICT;
        let bestCat = clauseType === "expense" ? "Others" : "Other Income";
        let bestScore = 0;
        Object.entries(dict).forEach(([cat, kws]) => {
          const score = words.reduce(
            (acc, w) => acc + (kws.includes(w) ? 1 : 0),
            0
          );
          if (score > bestScore) {
            bestScore = score;
            bestCat = cat;
          }
        });

        // 6c) Choose a “store” keyword: first matching keyword for that category
        const catKeywords = dict[bestCat] || [];
        const storeKeyword = findStoreKeyword(words, catKeywords);
        const store = storeKeyword || bestCat;

        // 6d) Push a single parsed record
        records.push({
          type: clauseType,
          amount,
          category: bestCat,
          store,
          date: new Date().toISOString(),
        });
      });
    });
  });

  return records;
}
