const EXPENSE_VERBS = new Set([
  "spent",
  "bought",
  "paid",
  "purchased",
  "cost",
  "expense",
]);
const INCOME_VERBS = new Set([
  "got",
  "received",
  "earned",
  "salary",
  "income",
  "paid",
]);
const EXPENSE_PREPS = new Set(["on", "for", "at", "from"]);

const RELATIVE_DATES = {
  yesterday: -1,
  today: 0,
  tomorrow: 1,
};

const EXPENSE_DICT = {
  Food: [
    "food",
    "groceries",
    "restaurant",
    "meal",
    "lunch",
    "dinner",
    "breakfast",
  ],
  Transport: ["transport", "bus", "taxi", "uber", "fuel", "petrol", "gas"],
  Shopping: ["shopping", "clothes", "shirt", "shoes", "dress"],
  Bills: ["bill", "electricity", "water", "internet", "phone"],
  Others: [],
};

const INCOME_DICT = {
  Salary: ["salary", "wage", "pay", "paycheck", "income"],
  Freelance: ["freelance", "project", "client", "work"],
  "Other Income": [],
};

// Custom algorithm for transaction extraction
class CustomTransactionExtractor {
  constructor() {
    this.patterns = [
      // Pattern: "spent X on Y"
      /(?:spent|paid|bought)\s+(\d+(?:\.\d+)?)\s+(?:on|for|at)\s+([^,.]+)/gi,
      // Pattern: "got X from Y"
      /(?:got|received|earned)\s+(\d+(?:\.\d+)?)\s+(?:from|as)\s+([^,.]+)/gi,
      // Pattern: "X for Y"
      /(\d+(?:\.\d+)?)\s+(?:for|on)\s+([^,.]+)/gi,
      // Pattern: "salary X from Y"
      /(?:salary|income|wage)\s+(?:of\s+)?(\d+(?:\.\d+)?)\s+(?:from\s+)?([^,.]*)/gi,
    ];
  }

  extractTransactions(text) {
    const transactions = [];
    const processedText = text.toLowerCase().trim();

    // Split by common separators
    const sentences = processedText
      .split(/[,;]|(?:\s+and\s+)/)
      .map((s) => s.trim())
      .filter(Boolean);

    for (const sentence of sentences) {
      const transaction = this.parseTransaction(sentence);
      if (transaction) {
        transactions.push(transaction);
      }
    }

    return transactions;
  }

  parseTransaction(sentence) {
    const words = this.tokenizeAndClean(sentence);
    const numberIndex = this.findFirstNumberIndex(words);

    if (numberIndex === -1) return null;

    const amount = Number.parseFloat(words[numberIndex]);
    const type = this.determineType(words);

    if (!type) return null;

    const description = this.extractDescription(words, numberIndex, type);
    const category = this.categorizeTransaction(description, type);
    const date = this.extractDate(words);

    return {
      type,
      amount,
      category,
      store: description || category,
      date: date.toISOString(),
    };
  }

  tokenizeAndClean(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  }

  findFirstNumberIndex(words) {
    return words.findIndex(
      (w) => !isNaN(Number.parseFloat(w)) && isFinite(Number.parseFloat(w))
    );
  }

  determineType(words) {
    const hasExpenseVerb = words.some((w) => EXPENSE_VERBS.has(w));
    const hasIncomeVerb = words.some((w) => INCOME_VERBS.has(w));

    if (hasExpenseVerb && !hasIncomeVerb) return "expense";
    if (hasIncomeVerb && !hasExpenseVerb) return "income";

    // Additional context-based detection
    if (
      words.includes("salary") ||
      words.includes("wage") ||
      words.includes("income")
    ) {
      return "income";
    }

    return "expense"; // Default to expense
  }

  extractDescription(words, numberIndex, type) {
    if (type === "expense") {
      const prepIndex = words.findIndex(
        (w, i) => i > numberIndex && EXPENSE_PREPS.has(w)
      );
      return prepIndex !== -1
        ? words.slice(prepIndex + 1).join(" ")
        : words.slice(numberIndex + 1).join(" ");
    } else {
      const fromIndex = words.findIndex(
        (w, i) => i > numberIndex && w === "from"
      );
      return fromIndex !== -1
        ? words.slice(fromIndex + 1).join(" ")
        : words.slice(0, numberIndex).join(" ");
    }
  }

  categorizeTransaction(description, type) {
    const dict = type === "expense" ? EXPENSE_DICT : INCOME_DICT;
    let bestCategory = type === "expense" ? "Others" : "Other Income";
    let bestScore = 0;

    const descWords = description ? description.split(/\s+/) : [];

    Object.entries(dict).forEach(([category, keywords]) => {
      const score = descWords.filter((word) => keywords.includes(word)).length;
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    });

    return bestCategory;
  }

  extractDate(words) {
    const date = new Date();
    for (const [keyword, offset] of Object.entries(RELATIVE_DATES)) {
      if (words.includes(keyword)) {
        date.setDate(date.getDate() + offset);
        break;
      }
    }
    return date;
  }
}

// AI-Enhanced Parser using Hugging Face
class AIEnhancedParser {
  constructor() {
    this.customExtractor = new CustomTransactionExtractor();
    this.apiKey = process.env.HUGGINGFACE_API_KEY || "hf_your_api_key_here";
  }

  async parseWithAI(text) {
    try {
      // First, try AI-based parsing
      const aiResult = await this.callHuggingFaceAPI(text);
      const aiTransactions = this.processAIResponse(aiResult, text);

      if (aiTransactions && aiTransactions.length > 0) {
        return aiTransactions;
      }
    } catch (error) {
      console.warn(
        "AI parsing failed, falling back to custom algorithm:",
        error.message
      );
    }

    // Fallback to custom algorithm
    return this.customExtractor.extractTransactions(text);
  }

  async callHuggingFaceAPI(text) {
    const prompt = `Extract financial transactions from this text. For each transaction, identify:
1. Type (expense or income)
2. Amount (number only)
3. Description/Store
4. Category

Text: "${text}"

Format your response as JSON array with objects containing: type, amount, description, category`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 200,
            temperature: 0.3,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`AI API failed: ${response.status}`);
    }

    return await response.json();
  }

  processAIResponse(aiResponse, originalText) {
    try {
      // Process AI response and extract structured data
      // This is a simplified version - you might need to adjust based on actual AI response format
      const transactions = [];

      // If AI parsing fails or returns unexpected format, fall back to custom algorithm
      if (!aiResponse || !Array.isArray(aiResponse)) {
        return this.customExtractor.extractTransactions(originalText);
      }

      // Process AI response (this would need to be adapted based on actual AI model response)
      return this.customExtractor.extractTransactions(originalText);
    } catch (error) {
      console.warn("AI response processing failed:", error);
      return this.customExtractor.extractTransactions(originalText);
    }
  }

  // Enhanced parsing with better sentence splitting
  enhancedSentenceSplit(text) {
    // Use regex to better split compound sentences
    const patterns = [
      /\s+and\s+(?=i\s+(?:spent|got|received|earned|paid|bought))/gi,
      /[,;]\s*(?=i\s+(?:spent|got|received|earned|paid|bought))/gi,
      /\.\s*(?=i\s+(?:spent|got|received|earned|paid|bought))/gi,
    ];

    let sentences = [text];

    patterns.forEach((pattern) => {
      const newSentences = [];
      sentences.forEach((sentence) => {
        newSentences.push(...sentence.split(pattern));
      });
      sentences = newSentences;
    });

    return sentences.map((s) => s.trim()).filter(Boolean);
  }
}

// Main parsing function
export async function parseAndCategorizeText(text) {
  const parser = new AIEnhancedParser();

  try {
    // Enhanced sentence splitting first
    const sentences = parser.enhancedSentenceSplit(text);
    const allTransactions = [];

    for (const sentence of sentences) {
      const transactions = await parser.parseWithAI(sentence);
      allTransactions.push(...transactions);
    }

    // Remove duplicates and validate
    const uniqueTransactions = allTransactions.filter(
      (transaction, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.type === transaction.type &&
            t.amount === transaction.amount &&
            t.store === transaction.store
        )
    );

    const correctedText = uniqueTransactions
      .map(formatTransaction)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

    return {
      records: uniqueTransactions,
      correctedText,
    };
  } catch (error) {
    console.error("Enhanced parsing failed:", error);
    // Ultimate fallback to original custom algorithm
    const customExtractor = new CustomTransactionExtractor();
    const records = customExtractor.extractTransactions(text);
    const correctedText = records
      .map(formatTransaction)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

    return { records, correctedText };
  }
}

function formatTransaction(record) {
  const typeStr = record.type === "expense" ? "spent" : "got";
  const prep = record.type === "expense" ? "on" : "from";
  const store = record.store.replace(/\s+/g, " ").trim();
  return `I ${typeStr} ${record.amount} ${prep} ${store}.`;
}

// Alternative free AI service using OpenAI-compatible API
export class AlternativeAIParser {
  constructor() {
    this.customExtractor = new CustomTransactionExtractor();
  }

  async parseWithOpenAICompatible(text) {
    try {
      // You can use services like:
      // - Groq (free tier)
      // - Together AI (free tier)
      // - Replicate (free tier)

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content:
                  "You are a financial transaction parser. Extract transactions from text and return them as JSON array with fields: type (expense/income), amount (number), description (string), category (string).",
              },
              {
                role: "user",
                content: `Parse this text: "${text}"`,
              },
            ],
            temperature: 0.1,
            max_tokens: 500,
          }),
        }
      );

      const result = await response.json();
      return this.processOpenAIResponse(result, text);
    } catch (error) {
      console.warn("Alternative AI parsing failed:", error);
      return this.customExtractor.extractTransactions(text);
    }
  }

  processOpenAIResponse(response, originalText) {
    try {
      const content = response.choices?.[0]?.message?.content;
      if (!content) throw new Error("No content in AI response");

      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const transactions = JSON.parse(jsonMatch[0]);
        return transactions.map((t) => ({
          type: t.type,
          amount: Number.parseFloat(t.amount),
          category:
            t.category || (t.type === "expense" ? "Others" : "Other Income"),
          store: t.description || t.store || "Unknown",
          date: new Date().toISOString(),
        }));
      }
    } catch (error) {
      console.warn("Failed to process AI response:", error);
    }

    return this.customExtractor.extractTransactions(originalText);
  }
}
