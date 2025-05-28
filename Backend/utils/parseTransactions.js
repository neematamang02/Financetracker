// backend/utils/parseTransactions.js

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

const EXPENSE_TRIGGERS = new Set(["spent", "buy", "paid", "purchase", "on"]);
const INCOME_TRIGGERS = new Set([
  "from",
  "got",
  "earned",
  "received",
  "credit",
]);

const EXPENSE_DICT = {
  Food: ["food", "grocery", "restaurant", "cafe", "dinner", "lunch"],
  Clothes: ["clothes", "fashion", "mall", "boutique", "shirt", "pants"],
  Furniture: ["furniture", "sofa", "table", "chair", "bed"],
  Transport: ["taxi", "uber", "bus", "train", "fuel", "gas"],
  Entertainment: ["movie", "netflix", "concert", "game"],
  Utilities: ["electricity", "water", "internet", "power", "bill"],
};
const INCOME_DICT = {
  Salary: ["salary", "wages", "pay", "income"],
  Gift: ["gift", "bonus", "present", "award"],
  Refund: ["refund", "reimbursement"],
};

export function parseAndCategorizeText(text) {
  const records = [];
  // 1) Split into clauses
  const clauses = text
    .split(/[\r\n]+|[.;?!]+/)
    .map((c) => c.trim())
    .filter(Boolean);

  clauses.forEach((clause) => {
    const lc = clause.toLowerCase();
    // 2) find first amount
    const amtMatch = lc.match(/\b(\d+(?:\.\d{1,2})?)\b/);
    if (!amtMatch) return;
    const amount = parseFloat(amtMatch[1]);

    // 3) decide expense vs income
    let scoreExp = 0,
      scoreInc = 0;
    lc.split(/\s+/).forEach((w) => {
      if (EXPENSE_TRIGGERS.has(w)) scoreExp++;
      if (INCOME_TRIGGERS.has(w)) scoreInc++;
    });
    const type = scoreInc > scoreExp ? "income" : "expense";

    // 4) extract the “list” after the keyword “on” or “from”
    //    fallback: entire clause minus amount
    let itemsPart = "";
    const splitKeyword = type === "expense" ? " on " : " from ";
    const idx = lc.indexOf(splitKeyword);
    if (idx !== -1) {
      itemsPart = lc.substring(idx + splitKeyword.length);
    } else {
      // remove the amount token
      itemsPart = clause.replace(amtMatch[1], "").trim();
    }

    // 5) split on commas and “and”
    const rawItems = itemsPart
      .split(/,|\band\b/)
      .map((s) => s.trim())
      .filter(Boolean);

    // 6) for each item, detect category and build record
    rawItems.forEach((raw) => {
      // pick correct dict
      const dict = type === "expense" ? EXPENSE_DICT : INCOME_DICT;
      // score categories
      let bestCat = type === "expense" ? "Others" : "Other Income";
      let bestScore = 0;
      const words = raw.split(/\s+/).filter((w) => !STOP_WORDS.has(w));
      Object.entries(dict).forEach(([cat, kws]) => {
        const s = words.reduce((acc, w) => acc + (kws.includes(w) ? 1 : 0), 0);
        if (s > bestScore) {
          bestScore = s;
          bestCat = cat;
        }
      });

      records.push({
        type,
        amount,
        category: bestCat,
        store: raw,
        date: new Date().toISOString(),
      });
    });
  });

  return records;
}
